import { exportQueue } from '../../libs/BullMQ/queues/export.queue.js'

class exportGameService {
    async run() {
        console.log("Queue name:", exportQueue.name);

        const job = await exportQueue.add("exportGamesCSV", {
            requestedAt: new Date()
        }, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 5000
            },
            removeOnComplete: false, // ⭐ IMPORTANT
            removeOnFail: false
        });

        console.log("JOB CREATED ID:", job.id);

        return {
            jobId: job.id,
            message: "Export job added to queue!"
        }
    }
}

export default new exportGameService();
