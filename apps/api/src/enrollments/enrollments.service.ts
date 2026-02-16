import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentsCadenceDto } from './dto/update-enrollments-cadence.dto';

@Injectable()
export class EnrollmentsService {
  createEnrollment(dto: CreateEnrollmentDto) {
    const { cadenceId, contactEmail } = dto;

    return {
      message: 'Enrollment created',
      cadenceId,
      contactEmail,
    };
  }

  getEnrollment(id) {
    return `returned enrollment ${id}`;
  }

  async updateCadenceInFlight(id, dto: UpdateEnrollmentsCadenceDto) {
    return `returned enrollment ${id}`;
  }
}
