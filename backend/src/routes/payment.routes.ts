import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

router.post('/initialize', PaymentController.initializePayment);
router.post('/verify', PaymentController.verifyPayment);
router.post('/', PaymentController.createPayment);
router.get('/', PaymentController.getUserPayments);
router.get('/:id', PaymentController.getPayment);

export default router;