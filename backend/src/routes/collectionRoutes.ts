// routes/collectionRoutes.ts
import { createCollection, deleteCollection, getCollections, updateCollection } from '../controllers/collectionController';
import express from 'express';


const router = express.Router();

router.post('/', createCollection); // Create a collection
router.get('/', getCollections); // Get all collections
router.put('/:id', updateCollection); // Update a collection
router.delete('/:id', deleteCollection); // Delete a collection

export default router;
