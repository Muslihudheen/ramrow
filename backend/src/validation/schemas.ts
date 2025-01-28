import Joi from 'joi';

export const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('guest', 'user').default('user'),
});

export const addressSchema = Joi.object({
  name: Joi.string().required(),
  address1: Joi.string().required(),
  address2: Joi.string(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
  phone: Joi.string().required(),
  isDefault: Joi.boolean().default(false),
});

export const productSchema = Joi.object({
  categoryId: Joi.string().required(),
  brandId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().min(0).required(),
  discount: Joi.number().min(0).max(100).default(0),
  coupons: Joi.array().items(Joi.string()),
  images: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  brand: Joi.string().required(),
});

export const cartItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const orderSchema = Joi.object({
  items: Joi.array().items(Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  })).required(),
  shippingAddressId: Joi.string().required(),
  paymentMethod: Joi.string().required(),
});

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string(),
  isActive: Joi.boolean(),
});

export const couponSchema = Joi.object({
  code: Joi.string().required(),
  description: Joi.string().required(),
  discountType: Joi.string().valid('percentage', 'fixed').required(),
  discountValue: Joi.number().positive().required(),
  minPurchase: Joi.number().min(0),
  maxDiscount: Joi.number().min(0),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  usageLimit: Joi.number().integer().min(1),
  isActive: Joi.boolean(),
});

export const homepageSchema = Joi.object({
  banners: Joi.array().items(Joi.string()),
  trendingProducts: Joi.array().items(Joi.string()),
  newArrivals: Joi.array().items(Joi.string()),
  videos: Joi.array().items(Joi.string()),
});

export const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid('placed', 'shipped', 'delivered', 'cancelled')
    .required(),
});

export const bulkDeleteSchema = Joi.object({
  type: Joi.string()
    .valid('products', 'categories', 'coupons')
    .required(),
  ids: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
});