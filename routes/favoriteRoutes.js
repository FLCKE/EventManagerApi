import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getFavorites);
router.post('/', auth, addFavorite);
router.delete('/', auth, removeFavorite);

export default router;