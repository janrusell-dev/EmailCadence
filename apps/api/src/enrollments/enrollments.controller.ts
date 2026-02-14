import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentService: EnrollmentsService) {}
  @Post()
  createEnrollment(): string {
    return this.enrollmentService.createEnrollment();
  }

  @Get(':id')
  getEnrollment(@Param('id') id: string): string {
    return this.enrollmentService.getEnrollment(id);
  }

  @Put(':id/update-cadence')
  updateCadenceInFlight(@Param('id') id: string): string {
    return this.enrollmentService.updateCadenceInFlight(id);
  }
}
