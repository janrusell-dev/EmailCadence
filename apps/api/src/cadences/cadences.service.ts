import { Injectable } from '@nestjs/common';

@Injectable()
export class CadencesService {
  createCadence(): string {
    return 'cadence created';
  }

  getCadence(id): string {
    return `returned cadence ${id}`;
  }

  updateCadence(id): string {
    return 'asdasdasd';
  }
}
