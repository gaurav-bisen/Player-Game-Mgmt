import {handleResponse} from '../utils/handleResponse.util.js'
import createCategoryService from '../services/games/createCategory.service.js'
import listCategoryService from '../services/games/listCategory.service.js';
import listGames from '../services/games/listGames.service.js'
import createGames from '../services/games/createGame.service.js'

class GameController{

    //Categories
    async createCategory(req, res, next){
        try {
            const category = await createCategoryService.create(req.body, req.user.id);

            handleResponse(res, {
                status: 201,
                message: "Game Category Created SuccessFully!",
                data: category
              });
        
        } catch (error) {
            next(error);
        }
    }

    async listCategory(req, res, next){
        try {
            const list = await listCategoryService.list();

            handleResponse(res, {
                status: 201,
                message: "Game Category Fetched SuccessFully!",
                data: list
              });
        
        } catch (error) {
            next(error);
        }
    }

    //Games
    async createGame(req, res, next){
        try {
            const game = await createGames.create(req.body, req.user.id);

            handleResponse(res, {
                status: 201,
                message: "Game Created SuccessFully!",
                data: game
              });
        } catch (error) {
            next(error);
        }
    }

    async listGame(req, res, next){
        try {
            const list = await listGames.list();

            handleResponse(res, {
                status: 201,
                message: "Games list Fetched SuccessFully!",
                data: list
              });
            
        } catch (error) {
            next(error);
        }
    }


}

export default new GameController();
