import { IsEmail, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  cadenceId: string;

  @IsEmail()
  contactEmail: string;
}
