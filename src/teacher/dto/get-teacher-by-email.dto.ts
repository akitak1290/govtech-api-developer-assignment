import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetTeacherByEmailDto{
  @IsNotEmpty()
  @IsEmail()
  teacher: string;
}
