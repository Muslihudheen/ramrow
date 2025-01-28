import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

export class AnalyticsService {
  static async getSalesAnalytics(period: string = 'monthly') {
    const currentDate = new Date();
    let startDate = new Date();
    let groupBy: any = { $month: '$createdAt' };
    let format = '%m';

    switch (period) {
      case 'yearly':
        startDate.setFullYear(currentDate.getFullYear() - 1);
        groupBy = { $year: '$createdAt' };
        format = '%Y';
        break;
      case 'monthly':
        startDate.setMonth(currentDate.getMonth() - 11);
        break;
      case 'weekly':
        startDate.setDate(currentDate.getDate() - 7);
        groupBy = { 
          $dateToString: { 
            format: '%Y-%m-%d', 
            date: '$createdAt' 
          } 
        };
        format = '%Y-%m-%d';
        break;
      default:
        startDate.setMonth(currentDate.getMonth() - 11);
    }

    const [salesData, customerData, productData] = await Promise.all([
      // Sales Analytics
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
            paymentStatus: 'completed'
          }
        },
        {
          $group: {
            _id: groupBy,
            totalSales: { $sum: '$totalPrice' },
            orderCount: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),

      // Customer Analytics
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: groupBy,
            newCustomers: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),

      // Product Performance
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
            paymentStatus: 'completed'
          }
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.priceAtTime'] } }
          }
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        {
          $project: {
            _id: 1,
            title: '$product.title',
            totalQuantity: 1,
            totalRevenue: 1,
            averagePrice: { $divide: ['$totalRevenue', '$totalQuantity'] }
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 10 }
      ])
    ]);

    // Calculate growth rates
    const calculateGrowth = (data: any[], valueKey: string) => {
      if (data.length < 2) return 0;
      const current = data[data.length - 1][valueKey];
      const previous = data[data.length - 2][valueKey];
      return previous ? ((current - previous) / previous) * 100 : 0;
    };

    // Format time series data
    const formatTimeSeriesData = (data: any[], valueKey: string) => {
      return data.map(item => ({
        period: item._id,
        value: item[valueKey]
      }));
    };

    return {
      overview: {
        totalSales: salesData.reduce((sum, item) => sum + item.totalSales, 0),
        totalOrders: salesData.reduce((sum, item) => sum + item.orderCount, 0),
        salesGrowth: calculateGrowth(salesData, 'totalSales'),
        orderGrowth: calculateGrowth(salesData, 'orderCount'),
        customerGrowth: calculateGrowth(customerData, 'newCustomers')
      },
      charts: {
        sales: formatTimeSeriesData(salesData, 'totalSales'),
        orders: formatTimeSeriesData(salesData, 'orderCount'),
        customers: formatTimeSeriesData(customerData, 'newCustomers')
      },
      topProducts: productData
    };
  }

  static async getProductPerformance() {
    const [topSelling, lowStock, noSales] = await Promise.all([
      // Top Selling Products
      Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.priceAtTime'] } }
          }
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        {
          $project: {
            title: '$product.title',
            totalQuantity: 1,
            totalRevenue: 1,
            averagePrice: { $divide: ['$totalRevenue', '$totalQuantity'] }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 10 }
      ]),

      // Low Stock Products
      Product.find({ stock: { $lt: 10 }, isActive: true })
        .select('title stock')
        .sort({ stock: 1 })
        .limit(10),

      // Products with No Sales
      Product.aggregate([
        {
          $lookup: {
            from: 'orders',
            let: { productId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$$productId', '$items.product']
                  }
                }
              }
            ],
            as: 'orders'
          }
        },
        {
          $match: {
            orders: { $size: 0 },
            isActive: true
          }
        },
        {
          $project: {
            title: 1,
            stock: 1,
            createdAt: 1
          }
        },
        { $sort: { createdAt: 1 } },
        { $limit: 10 }
      ])
    ]);

    return {
      topSelling,
      lowStock,
      noSales
    };
  }
}