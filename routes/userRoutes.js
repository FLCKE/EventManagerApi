import express from 'express';
import auth from '../middlewares/auth.js';
import { getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/userController.js';
import { upload } from '../middlewares/pictureAdd.js';

const router = express.Router();

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.delete('/:id', auth, deleteUser);
router.put('/:id', auth, upload.single('image'), updateUser);
export default router;