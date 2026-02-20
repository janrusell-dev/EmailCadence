import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private healthService: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => {
        const result = await this.healthService.check();
        if (result.status === 'up') {
          return { temporal: { status: 'up' } };
        }
        throw new Error(result.message ?? 'Temporal is down');
      },
    ]);
  }
}
