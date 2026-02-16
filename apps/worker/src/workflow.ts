import {
  defineQuery,
  defineSignal,
  proxyActivities,
  setHandler,
  sleep,
} from "@temporalio/workflow";
import type * as activities from "./activities";
import type { CadenceStep, WorkflowState, WorkflowInput } from "shared";
const { sendEmail } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export const getStateQuery = defineQuery<WorkflowState>("getState");
export const updateCadenceSignal =
  defineSignal<[CadenceStep[]]>("updateCadence");

export async function cadenceWorkflow(input: WorkflowInput): Promise<String> {
  let steps = input.steps;
  let currentStepIndex = 0;
  let stepsVersion = 1;
  let status: "RUNNING" | "COMPLETED" | "FAILED" = "RUNNING";

  setHandler(
    getStateQuery,
    (): WorkflowState => ({
      currentStepIndex,
      stepsVersion,
      status,
    }),
  );

  setHandler(updateCadenceSignal, (newSteps: CadenceStep[]) => {
    if (newSteps.length <= currentStepIndex) {
      status = "COMPLETED";
    } else {
      steps = newSteps;
    }
    stepsVersion++;
  });

  try {
    while (currentStepIndex < steps.length && status === "RUNNING") {
      const step = steps[currentStepIndex];

      if (step && step.type === "SEND_EMAIL") {
        console.log(`📧 Sending email: "${step.subject}"`);
        await sendEmail({
          to: input.contactEmail,
          subject: step.subject || "No subject",
          body: step.body || "No body",
        });
      } else if (step?.type === "WAIT") {
        const seconds = step.seconds || 0;
        await sleep(seconds * 1000);
      }

      currentStepIndex++;
    }

    status = "COMPLETED";

    return `Cadence ${input.cadenceId} completed for ${input.contactEmail}`;
  } catch (error) {
    status = "FAILED";
    throw error;
  }
}
