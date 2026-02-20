import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, HttpModule],
  providers: [HealthService],
})
export class HealthModule {}
