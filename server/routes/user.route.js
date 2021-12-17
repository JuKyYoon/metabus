import express from 'express';
import UserController from '../controller/user.controller.js';
const router = express.Router();

/**
 * 관리자 기능
 * Get All users
 * @authMiddleware
 * @adminBlockMiddleware
 */
// router.get('/', authMiddleware, adminBlockMiddleware, UserController.getUsers);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.post('/auth', UserController.authUser);

export default router;
