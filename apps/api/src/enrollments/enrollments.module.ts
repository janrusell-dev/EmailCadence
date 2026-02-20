import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { CadencesModule } from 'src/cadences/cadences.module';
import { TemporalModule } from 'src/temporal/temporal.module';

@Module({
  imports: [CadencesModule, TemporalModule],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
