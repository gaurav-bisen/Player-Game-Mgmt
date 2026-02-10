import { handleResponse } from '../utils/handleResponse.util.js'
import createCategoryService from '../services/games/createCategory.service.js'
import listCategoryService from '../services/games/listCategory.service.js';
import listGames from '../services/games/listGames.service.js'
import createGames from '../services/games/createGame.service.js'
import listGamesByCategoryService from '../services/games/listGamesByCategory.service.js';
import reorderGameCategoryService from '../services/games/reorderCategory.service.js'
import reorderGameService from '../services/games/reorderGame.service.js'
import BaseHandler from '../utils/baseHandler.js';

class GameController extends BaseHandler {

    //Categories
    async createCategory(req, res, next) {
        try {
            const service = createCategoryService.execute({
                data: req.body,
                creatorId: req.user.id
            }, req.context)
            const category = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Game Category Created SuccessFully!",
                data: category
            });

        } catch (error) {
            next(error);
        }
    }

    async listCategory(req, res, next) { //explained base handler start!
        try {
            // const {page, size, sortBy, order} = req.query;
            // const list = await listCategoryService.list(page, size, sortBy, order);

            const service = listCategoryService.execute({ ...req.query }, req.context)
            const games = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Game Category Fetched SuccessFully!",
                data: games
            });

        } catch (error) {
            next(error);
        }
    }

    //Games
    async createGame(req, res, next) {
        try {
            const service = createGames.execute({
                data: req.body,
                creatorId: req.user.id
            }, req.context)
            const game = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Game Created SuccessFully!",
                data: game
            });
        } catch (error) {
            next(error);
        }
    }

    async listGame(req, res, next) {
        try {
            const service = listGames.execute({ ...req.query }, req.context)

            const list = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Games list Fetched SuccessFully!",
                data: list
            });

        } catch (error) {
            next(error);
        }
    }

    //list games by category
    async listGamesByCategory(req, res, next) {
        try {
            const service = listGamesByCategoryService.execute({
                ...req.query,
                categoryId: req.params.categoryId,
            }, req.context);

            const games = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Games list By Category Fetched SuccessFully!",
                data: games
            });

        } catch (error) {
            next(error);
        }
    }

    //reorder game category
    async reorderGameCategory(req, res, next) {
        try {
            const service = reorderGameCategoryService.execute({
                ...req.body
            }, req.context)

            const reorder = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Games Category reorder SuccessFully!",
                data: reorder
            });
        } catch (error) {
            next(error)
        }
    }

    //reorder game
    async reorderGame(req, res, next) {
        try {
            const service = reorderGameService.execute({
                ...req.body
            }, req.context)

            const reorder = await service.run();

            handleResponse(res, {
                status: 201,
                message: "Games reorder SuccessFully!",
                data: reorder
            });
        } catch (error) {
            next(error)
        }
    }

}

export default new GameController();
