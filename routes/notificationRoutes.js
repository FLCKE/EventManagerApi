import express from 'express';
import { getUserNotifications, sendNotification, deleteNotification } from '../controllers/notificationController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Liste des notifications de l'utilisateur connecté
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 */
router.get('/', auth, getUserNotifications);

/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Créer une notification pour un utilisateur
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, message]
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur (null pour broadcast)
 *               message:
 *                 type: string
 *                 description: Message de la notification
 *     responses:
 *       201:
 *         description: Notification créée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 */
router.post('/', auth, sendNotification);

/**
 * @swagger
 * /notification/{id}:
 *   delete:
 *     summary: Supprimer une notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la notification
 *     responses:
 *       200:
 *         description: Notification supprimée
 */
router.delete('/:id', auth, deleteNotification);

export default router;