import express from 'express';
import { createUser, deleteUser, getAllUsers, login, updateUser } from '../controllers/userController';

const router = express.Router();

router.post('/create', createUser);
router.post('/login', login);
router.get('/getall', getAllUsers);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);                                                                                                                                                                     

export default router;