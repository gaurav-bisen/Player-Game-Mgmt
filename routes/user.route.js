import express from 'express'
import {authenticate} from '../middlewares/auth.middleware.js'
import { checkPermission } from '../middlewares/permission.middleware.js'
import userController from '../controllers/user.controller.js';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/create', authenticate, checkPermission('user', 'create'), userController.createUser);

router.post('/login', authController.login);

router.get('/', authenticate, checkPermission('user', 'create'), userController.getAllUser);

export default router;