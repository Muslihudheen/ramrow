import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { requireAuth, requireAdminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { orderSchema } from '../validation/schemas';

const router = Router();

router.use(requireAuth);

router.post('/', validate(orderSchema), OrderController.createOrder);
router.get('/', OrderController.getUserOrders);
router.put('/:id/status', requireAdminAuth, OrderController.updateOrderStatus);

export default router;