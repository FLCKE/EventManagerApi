import express from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent, getAllEventsByOrganizer } from '../controllers/eventController.js';
import auth from '../middlewares/auth.js';
import { upload } from '../middlewares/pictureAdd.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.get('/organizer/:id', getAllEventsByOrganizer);
router.post('/', auth, upload.single('image'), createEvent);
router.put('/:id', auth, upload.single('image'), updateEvent);
router.delete('/:id', auth, deleteEvent);

export default router;