"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("@temporalio/worker");
const activities = require("./activities");
async function run() {
    const connection = await worker_1.NativeConnection.connect({
        address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
    });
    try {
        const worker = await worker_1.Worker.create({
            connection,
            namespace: process.env.TEMPORAL_NAMESPACE || "default",
            taskQueue: process.env.TEMPORAL_TASK_QUEUE || "email-cadence",
            workflowsPath: require.resolve("./workflow"),
            activities,
        });
        await worker.run();
    }
    catch (error) {
        throw error;
    }
    finally {
        await connection.close();
    }
}
run().catch((err) => {
    process.exit(1);
});
//# sourceMappingURL=worker.js.map