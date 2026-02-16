import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CadencesModule } from './cadences/cadences.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { TemporalModule } from './temporal/temporal.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [CadencesModule, EnrollmentsModule, TemporalModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
