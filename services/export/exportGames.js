import { exportQueue } from '../../libs/BullMQ/queues/export.queue.js'

class exportGameService {
    async run() {
        console.log("Queue name:", exportQueue.name);

        //adding job in redis
        const job = await exportQueue.add("exportGamesCSV", {
            requestedAt: new Date()
        }, {
            attempts: 3, //retry 
            backoff: { //retry delay
                type: "exponential", //increase retry time in continous fail
                delay: 5000
            },

        });

        console.log("JOB CREATED ID:", job.id);

        return {
            jobId: job.id,
            message: "Export job added to queue!"
        }
    }
}

export default new exportGameService();
