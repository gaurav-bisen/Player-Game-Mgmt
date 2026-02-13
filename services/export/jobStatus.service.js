import { exportQueue } from '../../libs/BullMQ/queues/export.queue.js'
class jobStatusService {
    async run(id) {
        const job = await exportQueue.getJob(id);

        if (!job) {
            const err = new Error('Job Not Found');
            err.status = 404;
            throw err;
        }

        const state = await job.getState(); //waiting,active,completed,failed
        const progress = job.progress;

        return {
            state,
            progress,
            result: job.returnvalue
        }
    }
}

export default new jobStatusService();
