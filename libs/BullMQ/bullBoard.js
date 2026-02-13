import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { exportQueue } from "./queues/export.queue.js";

const { BullMQAdapter } = await import("@bull-board/api/dist/queueAdapters/bullMQ.js");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(exportQueue)],
  serverAdapter,
});

export const bullBoardRouter = serverAdapter.getRouter();
