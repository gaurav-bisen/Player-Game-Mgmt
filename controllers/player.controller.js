import createPlayerService from '../services/players/createPlayer.service.js';
import { handleResponse } from '../utils/handleResponse.util.js'

class playerController {
    async createPlayer(req, res, next) {
        try {
            const service = createPlayerService.execute({
                data: req.body
            }, req.context)

            const player = await service.run();

            handleResponse(res, {
                status: 201,
                message: " Player Created SuccessFully!",
                data: player
            });
        } catch (error) {
            next(error);
        }
    }
}


export default new playerController();
