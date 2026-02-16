import { NativeConnection, Worker } from "@temporalio/worker";
import * as activities from "./activities";

async function run() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
  });

  try {
    const worker = await Worker.create({
      connection,
      namespace: process.env.TEMPORAL_NAMESPACE || "default",
      taskQueue: process.env.TEMPORAL_TASK_QUEUE || "email-cadence",
      workflowsPath: require.resolve("./workflow"),
      activities,
    });

    await worker.run();
  } catch (error) {
    throw error;
  } finally {
    await connection.close();
  }
}

run().catch((err) => {
  process.exit(1);
});
