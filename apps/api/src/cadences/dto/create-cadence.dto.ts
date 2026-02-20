import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StepType } from 'shared';

export class CadenceStepDto {
  @IsString()
  id: string;

  @IsEnum(StepType)
  type: StepType;

  @IsString()
  subject?: string;

  @IsString()
  body?: string;

  seconds?: number;
}

export class CreateCadenceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  steps: CadenceStepDto[];
}
