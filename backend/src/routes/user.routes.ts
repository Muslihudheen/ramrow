import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

router.post('/migrate-cart', UserController.migrateGuestCart);
router.put('/role', UserController.updateRole);

export default router;