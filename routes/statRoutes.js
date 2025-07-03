import express from 'express';
import auth from '../middlewares/auth.js';
import { getOrganizerStats } from '../controllers/statController.js';
const router = express.Router();
/**
 * @swagger
 * /stat/{id}:
 *   get:
 *     summary: Statistiques pour un organisateur
 *     tags: [Stat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'organisateur
 *     responses:
 *       200:
 *         description: Statistiques récupérées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalEvents:
 *                   type: number
 *                 totalParticipants:
 *                   type: number
 *                 totalSales:
 *                   type: number
 *                 registrationsByDay:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: number
 *                 recentRegistrations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       eventId:
 *                         $ref: '#/components/schemas/Event'
 *                       userId:
 *                         $ref: '#/components/schemas/User'
 *                 lastEvent:
 *                   $ref: '#/components/schemas/Event'
 *                 lastEventRegistrations:
 *                   type: number
 *       400:
 *         description: Organizer ID is required
 *       401:
 *         description: Non autorisé
 */
// Route pour récupérer les statistiques d'un organisateur
router.get('/:id', auth, getOrganizerStats);
export default router;
