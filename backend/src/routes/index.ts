import { Router } from 'express';
import adminRoutes from './admin.routes';
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import paymentRoutes from './payment.routes';
import userRoutes from './user.routes';
import homepageRoutes from './homepage.routes';
import categoryRoutes from './category.routes';
import couponRoutes from './coupon.routes';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/users', userRoutes);
router.use('/homepage', homepageRoutes);
router.use('/categories', categoryRoutes);
router.use('/coupons', couponRoutes);

export default router;