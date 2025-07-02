import express from 'express';
import auth from '../middlewares/auth.js';
import { getOrganizerStats } from '../controllers/statController.js';
const router = express.Router();
// Route pour récupérer les statistiques d'un organisateur
router.get('/:id', auth, getOrganizerStats);
export default router;
