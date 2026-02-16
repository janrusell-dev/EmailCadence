import { IsArray } from 'class-validator';
import { CadenceStepDto } from 'src/cadences/dto/create-cadence.dto';

export class UpdateEnrollmentsCadenceDto {
  @IsArray()
  steps: CadenceStepDto[];
}
