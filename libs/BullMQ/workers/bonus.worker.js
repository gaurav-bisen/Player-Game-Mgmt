import { Worker } from "bullmq";
import connection from "../../redis.js"; 
import runDailyBonusJobService from "../../../services/bonous/dailyBonous.service.js";

// worker(queue, callback)
const bonusWorker = new Worker(
  "bonusQueue", 
  async (job) => {
    console.log("BONUS WORKER RECEIVED JOB:", job.id, job.name);

    if (job.name === "dailyBonusJob") {
      const result = await runDailyBonusJobService.run();
      return { result };
    }
  },
  {
    connection,
    concurrency: 1, // one job at a time for safe wallet updates
  }
);

bonusWorker.on("completed", (job) => {
  console.log("Daily bonus job completed:", job.returnvalue);
});

bonusWorker.on("failed", (job, err) => {
  console.error("Daily bonus job failed:", err);
});
