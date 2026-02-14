import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrollmentsService {
  createEnrollment() {
    return 'This action';
  }

  getEnrollment(id) {
    return `returned enrollment ${id}`;
  }

  updateCadenceInFlight(id) {
    return `returned enrollment ${id}`;
  }
}
