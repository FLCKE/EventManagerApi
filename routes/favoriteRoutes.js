import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, getFavorites);
router.post('/', auth, addFavorite);
router.delete('/', auth, removeFavorite);/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Liste des événements favoris de l'utilisateur connecté
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */
router.get('/', auth, getFavorites);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Ajouter un événement aux favoris de l'utilisateur connecté
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId]
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID de l'événement à ajouter aux favoris
 *     responses:
 *       200:
 *         description: Favori ajouté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */
router.post('/', auth, addFavorite);

/**
 * @swagger
 * /favorites:
 *   delete:
 *     summary: Retirer un événement des favoris de l'utilisateur connecté
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId]
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID de l'événement à retirer des favoris
 *     responses:
 *       200:
 *         description: Favori retiré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */
router.delete('/', auth, removeFavorite);

export default router;