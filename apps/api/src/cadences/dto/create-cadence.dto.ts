import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CadenceStepDto {
  @IsString()
  id: string;

  @IsString()
  type: 'SEND_EMAIL' | 'WAIT';

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
