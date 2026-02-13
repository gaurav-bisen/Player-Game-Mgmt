import { Worker } from 'bullmq'
import connection from '../../redis.js'
import { exportGamesToCsv } from '../../../services/export/exportCsv.service.js'

const worker = new Worker("exportCSV", async job => {
    console.log("WORKER RECEIVED JOB:", job.id, job.name);

    if (job.name === "exportGamesCSV") {
        const filePath = await exportGamesToCsv(job);
        return { filePath };
    }
}, {
    connection,
    concurrency: 1
});

worker.on("completed", job => {
    console.log("Export completed:", job.returnvalue);
});

worker.on("failed", (job, err) => {
    console.error("Export failed:", err);
});

