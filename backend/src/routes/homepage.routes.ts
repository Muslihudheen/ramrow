import { Router } from 'express';
import { requireAuth, requireAdminAuth } from '../middleware/auth';
import { HomepageController } from '../controllers/homepage.controller';

const router = Router();

router.get('/', HomepageController.getHomepage);
router.put('/', requireAdminAuth, HomepageController.updateHomepage);
router.post('/products/:productId/view', requireAuth, HomepageController.recordProductView);

export default router;