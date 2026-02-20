import { StepType, WorkflowStatus } from "../enums/workflow.enums";

export interface CadenceStep {
  id: string;
  type: StepType;
  subject?: string;
  body?: string;
  seconds?: number;
}

export interface Cadence {
  id: string;
  name: string;
  steps: CadenceStep[];
}

export interface Enrollment {
  id: string;
  cadenceId: string;
  contactEmail: string;
  workflowId: string;
  currentStepIndex: number;
  stepsVersion: number;
  status: WorkflowStatus;
  steps: CadenceStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowState {
  currentStepIndex: number;
  stepsVersion: number;
  status: WorkflowStatus;
}

export interface WorkflowInput {
  cadenceId: string;
  contactEmail: string;
  steps: CadenceStep[];
}
