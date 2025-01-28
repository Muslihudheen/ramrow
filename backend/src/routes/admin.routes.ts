import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { AnalyticsController } from '../controllers/analytics.controller';
import { requireAdminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { adminLoginSchema, orderStatusSchema } from '../validation/schemas';

const router = Router();

// Public routes
router.post('/login', validate(adminLoginSchema), AdminController.login);

// Protected routes
router.use(requireAdminAuth);
router.get('/dashboard', AdminController.getDashboardStats);
router.get('/transactions', AdminController.getTransactions);
router.put('/orders/:orderId/status', validate(orderStatusSchema), AdminController.updateOrderStatus);
router.post('/bulk-delete', AdminController.bulkDeleteItems);

// Analytics routes
router.get('/analytics/sales', AnalyticsController.getSalesAnalytics);
router.get('/analytics/products', AnalyticsController.getProductPerformance);

export default router;