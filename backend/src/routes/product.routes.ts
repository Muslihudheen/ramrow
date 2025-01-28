import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { requireAdminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { productSchema } from '../validation/schemas';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', requireAdminAuth, validate(productSchema), ProductController.createProduct);
router.put('/:id', requireAdminAuth, validate(productSchema), ProductController.updateProduct);

export default router;