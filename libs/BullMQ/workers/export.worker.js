import { Worker } from 'bullmq'
import connection from '../../redis.js'
import { exportGamesToCsv } from '../../../services/export/exportCsv.service.js'

//worker(queue, callback)
const worker = new Worker("exportCSV", async job => {
    console.log("WORKER RECEIVED JOB:", job.id, job.name);

    if (job.name === "exportGamesCSV") {
        const result = await exportGamesToCsv(job);
        return { result };
    }
}, {
    connection,
    concurrency: 1 //controls how many jobs worker can process in parallel
});

worker.on("completed", job => {
    console.log("Export completed:", job.returnvalue);
});

worker.on("failed", (job, err) => {
    console.error("Export failed:", err);
});

