import { CadenceStep, WorkflowState, WorkflowInput } from "shared";
export declare const getStateQuery: import("@temporalio/workflow").QueryDefinition<WorkflowState, [], string>;
export declare const updateCadenceSignal: import("@temporalio/workflow").SignalDefinition<[CadenceStep[]], string>;
export declare function cadenceWorkflow(input: WorkflowInput): Promise<String>;
//# sourceMappingURL=workflow.d.ts.map