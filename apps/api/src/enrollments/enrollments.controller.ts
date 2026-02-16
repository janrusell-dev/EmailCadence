import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentsCadenceDto } from './dto/update-enrollments-cadence.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentService: EnrollmentsService) {}
  @Post()
  createEnrollment(@Body() createEnrollmentsDto: CreateEnrollmentDto) {
    return this.enrollmentService.createEnrollment(createEnrollmentsDto);
  }

  @Get(':id')
  getEnrollment(@Param('id') id: string): string {
    return this.enrollmentService.getEnrollment(id);
  }

  @Put(':id/update-cadence')
  updateCadenceInFlight(
    @Param('id') id: string,
    @Body() updateEnrollmentsCadenceDto: UpdateEnrollmentsCadenceDto,
  ) {
    return this.enrollmentService.updateCadenceInFlight(
      id,
      updateEnrollmentsCadenceDto,
    );
  }
}
