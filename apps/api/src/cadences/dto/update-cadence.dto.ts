import { PartialType } from '@nestjs/swagger';
import { CreateCadenceDto } from './create-cadence.dto';

export class UpdateCadenceDto extends PartialType(CreateCadenceDto) {}
