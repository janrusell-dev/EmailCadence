import { Injectable } from '@nestjs/common';
import { Client, Connection } from '@temporalio/client';

@Injectable()
export class HealthService {
  private client: Client | null = null;

  private async init() {
    if (!this.client) {
      const connection = await Connection.connect({
        address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
      });
      this.client = new Client({ connection });
    }
  }
  async check(): Promise<{ status: 'up' | 'down'; message?: string }> {
    try {
      await this.init();
      await this.client?.workflowService.listNamespaces({ pageSize: 1 });
      return { status: 'up' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { status: 'down', message };
    }
  }
}
