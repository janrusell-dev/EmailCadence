"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCadenceSignal = exports.getStateQuery = void 0;
exports.cadenceWorkflow = cadenceWorkflow;
const workflow_1 = require("@temporalio/workflow");
const workflow_enums_1 = require("shared/enums/workflow.enums");
const { sendEmail } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: "1 minute",
});
exports.getStateQuery = (0, workflow_1.defineQuery)("getState");
exports.updateCadenceSignal = (0, workflow_1.defineSignal)("updateCadence");
async function cadenceWorkflow(input) {
    let steps = input.steps;
    let currentStepIndex = 0;
    let stepsVersion = 1;
    let status = workflow_enums_1.WorkflowStatus.RUNNING;
    (0, workflow_1.setHandler)(exports.getStateQuery, () => ({
        currentStepIndex,
        stepsVersion,
        status,
    }));
    (0, workflow_1.setHandler)(exports.updateCadenceSignal, (newSteps) => {
        if (newSteps.length <= currentStepIndex) {
            status = workflow_enums_1.WorkflowStatus.COMPLETED;
        }
        else {
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
            }
            else if (step?.type === "WAIT") {
                const seconds = step.seconds || 0;
                await (0, workflow_1.sleep)(seconds * 1000);
            }
            currentStepIndex++;
        }
        status = workflow_enums_1.WorkflowStatus.COMPLETED;
        return `Cadence ${input.cadenceId} completed for ${input.contactEmail}`;
    }
    catch (error) {
        status = workflow_enums_1.WorkflowStatus.FAILED;
        throw error;
    }
}
//# sourceMappingURL=workflow.js.map