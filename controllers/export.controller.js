import {handleResponse} from '../utils/handleResponse.util.js'
import exportService from '../services/export/exportGames.js'
import jobStatusService from '../services/export/jobStatus.service.js';

class exportController{
    async exportGames(req, res, next){
        try {
            const result = await exportService.run();

            handleResponse(res, {
                status: 202, //accepted
                message: "CSV EXPORT STARTED IN BACKGROUND!",
                data: result.jobId
              });
        } catch (error) {
            next(error)
        }
    }

    async jobStatus(req, res, next){
        try {
            const {id} = req.params;
            const result = await jobStatusService.run(id);

            handleResponse(res, {
                status: 200, 
                message: "Job status!",
                data: result
              });
        } catch (error) {
            next(error);
        }
    }
}

export default new exportController();
