import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { cartItemSchema } from '../validation/schemas';

const router = Router();

router.use(requireAuth);

router.get('/', CartController.getCart);
router.post('/', validate(cartItemSchema), CartController.addToCart);
router.put('/:productId', validate(cartItemSchema), CartController.updateCartItem);
router.delete('/:productId', CartController.removeFromCart);

export default router;