import express from 'express';
import { getRegisterByOrganizer, getUserRegistrations, registerToEvent, unregisterFromEvent } from '../controllers/registrationController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /registration:
 *   get:
 *     summary: Liste des inscriptions de l'utilisateur connecté (filtrage possible par type)
 *     tags: [Registration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [upcoming, past, now]
 *         required: false
 *         description: Filtre sur le type d'événement (à venir, passé, en cours)
 *     responses:
 *       200:
 *         description: Liste des inscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', auth, getUserRegistrations);

/**
 * @swagger
 * /registration/register/{id}:
 *   get:
 *     summary: Liste des participants (inscriptions) pour tous les événements d'un organisateur
 *     tags: [Registration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'organisateur
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page de pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste des participants par événement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 register:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/User'
 *                       events:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Event'
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */
router.get('/register/:id', auth, getRegisterByOrganizer);

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Inscrire un utilisateur à un événement
 *     tags: [Registration]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId, id]
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: ID de l'événement
 *               id:
 *                 type: string
 *                 description: ID de l'utilisateur à inscrire
 *     responses:
 *       201:
 *         description: Inscription réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       409:
 *         description: Déjà inscrit
 *       400:
 *         description: Paramètres manquants
 */
router.post('/', auth, registerToEvent);

/**
 * @swagger
 * /registration/{id}:
 *   delete:
 *     summary: Désinscrire un utilisateur d'un événement (par ID d'inscription)
 *     tags: [Registration]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'inscription
 *     responses:
 *       200:
 *         description: Désinscription réussie
 *       404:
 *         description: Inscription non trouvée
 */
router.delete('/:id', auth, unregisterFromEvent);

export default router;