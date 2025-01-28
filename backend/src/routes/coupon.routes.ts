import { Router } from 'express';
import { requireAuth, requireAdminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { couponSchema } from '../validation/schemas';
import { CouponController } from '../controllers/coupon.controller';

const router = Router();

// Admin routes
router.get('/admin', requireAdminAuth, CouponController.listCoupons);
router.post('/', requireAdminAuth, validate(couponSchema), CouponController.createCoupon);
router.put('/:id', requireAdminAuth, validate(couponSchema), CouponController.updateCoupon);
router.post('/delete', requireAdminAuth, CouponController.deleteCoupons);

// Customer routes
router.get('/', requireAuth, CouponController.listCoupons);
router.post('/apply', requireAuth, CouponController.applyCoupon);
router.delete('/remove', requireAuth, CouponController.removeCoupon);

export default router;