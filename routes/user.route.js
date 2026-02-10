import express from 'express'
import {authenticate} from '../middlewares/auth.middleware.js'
import { checkPermission } from '../middlewares/permission.middleware.js'
import userController from '../controllers/user.controller.js';
import authController from '../controllers/auth.controller.js';
import { validateAJV } from '../middlewares/ajv.middleware.js';
import userSchema from '../Schema/users.schema.js'
import contextMiddleware from '../middlewares/context.middleware.js';


const router = express.Router();

router.post('/create',validateAJV(userSchema), authenticate, checkPermission('staff_management', 'create'), contextMiddleware(true), userController.createUser);

router.post('/login',contextMiddleware(true), authController.login);

router.get('/', authenticate, contextMiddleware(false), userController.getAllUser);

export default router;