import express from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import { checkPermission } from '../middlewares/permission.middleware.js'
import gameController from '../controllers/game.controller.js';
import { validateAJV } from '../middlewares/ajv.middleware.js';
import gameSchema from '../Schema/games.schema.js'
import gameCategorySchema from '../Schema/gameCategory.schema.js'

const router = express.Router();

//categories
router.post('/categories', validateAJV(gameCategorySchema), authenticate, checkPermission('game_management', 'create'), gameController.createCategory)

router.get('/categories', authenticate, checkPermission('game_management', 'read'), gameController.listCategory)

//reorder category
router.put('/categories/reorder', authenticate, checkPermission('game_management', 'update'), gameController.reorderGameCategory)

//games
router.post('/', validateAJV(gameSchema), authenticate, checkPermission('game_management', 'create'), gameController.createGame)

router.get('/', authenticate, checkPermission('game_management', 'read'), gameController.listGame)

//reorder game
router.put('/reorder', authenticate, checkPermission('game_management', 'update'), gameController.reorderGame)

//games by category
router.get('/:categoryId', authenticate, checkPermission('game_management', 'read'), gameController.listGamesByCategory)


export default router;

