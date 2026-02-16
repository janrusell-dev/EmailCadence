import { Injectable } from '@nestjs/common';
import { CreateCadenceDto } from './dto/create-cadence.dto';
import { UpdateCadenceDto } from './dto/update-cadence.dto';

@Injectable()
export class CadencesService {
  private cadences = new Map<string, CreateCadenceDto>();

  createCadence(cadence: CreateCadenceDto) {
    this.cadences.set(cadence.id, cadence);
    return cadence;
  }

  getCadence(id: string) {
    return this.cadences.get(id);
  }

  updateCadence(id: string, cadence: UpdateCadenceDto) {
    const exists = this.cadences.get(id);
    if (!exists) return null;

    const updated = { ...exists, ...cadence };
    this.cadences.set(id, updated);
    return updated;
  }
}
