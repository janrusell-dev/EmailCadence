import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, Connection } from '@temporalio/client';
import { CadenceStep, WorkflowState } from 'shared';

@Injectable()
export class TemporalService implements OnModuleInit {
  private readonly logger = new Logger(TemporalService.name);
  private client: Client;

  async onModuleInit() {
    try {
      const connection = await Connection.connect({
        address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
      });

      this.client = new Client({
        connection,
        namespace: process.env.TEMPORAL_NAMESPACE || 'default',
      });

      this.logger.log('Connected to Temporal server');
    } catch (error) {
      this.logger.error('Failed to connect to Temporal:', error);
      throw error;
    }
  }

  async startCadenceWorkflow(
    workflowId: string,
    cadenceId: string,
    contactEmail: string,
    steps: CadenceStep[],
  ) {
    const handle = await this.client.workflow.start('cadenceWorkflow', {
      taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'email-cadence',
      workflowId,
      args: [{ cadenceId, contactEmail, steps }],
    });

    this.logger.log(`Started workflow: ${workflowId}`);
    return handle;
  }

  async getWorkflowState(workflowId: string): Promise<WorkflowState | null> {
    try {
      const handle = this.client.workflow.getHandle(workflowId);
      const state = await handle.query<WorkflowState>('getState');
      return state;
    } catch (error) {
      this.logger.warn(`Failed to query workflow: ${error.message}`);
      return null;
    }
  }

  async updateCadenceInWorkflow(workflowId: string, steps: CadenceStep[]) {
    const handle = this.client.workflow.getHandle(workflowId);
    await handle.signal('updateCadence', steps);
    this.logger.log(`Sent updateCadence signal to ${workflowId}`);
  }
}
