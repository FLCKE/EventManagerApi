import express from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getAllEventsByOrganizer } from '../controllers/eventController.js';
import auth from '../middlewares/auth.js';
import { upload } from '../middlewares/pictureAdd.js';

const router = express.Router();

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Liste tous les événements
 *     tags: [Event]
 *     parameters:
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
 *       - in: query
 *         name: dateLimit
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Filtrer les événements à partir de cette date
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrer par localisation
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */
router.get('/', getAllEvents);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Détail d'un événement
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Événement non trouvé
 */
router.get('/:id', getEventById);

/**
 * @swagger
 * /event/organizer/{id}:
 *   get:
 *     summary: Liste des événements d'un organisateur
 *     tags: [Event]
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
 *       - in: query
 *         name: dateLimit
 *         schema:
 *           type: string
 *           format: date-time
 *         required: false
 *         description: Filtrer les événements à partir de cette date
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrer par localisation
 *     responses:
 *       200:
 *         description: Liste des événements de l'organisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */
router.get('/organizer/:id', getAllEventsByOrganizer);

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Créer un événement
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, date, capacity, price]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: number
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Événement créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/', auth, upload.single('image'), createEvent);

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Modifier un événement
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: number
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Événement non trouvé
 */
router.put('/:id', auth, upload.single('image'), updateEvent);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement supprimé
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Événement non trouvé
 */
router.delete('/:id', auth, deleteEvent);

export default router;