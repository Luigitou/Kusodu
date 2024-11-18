import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password is required' })
  password: string;
}
