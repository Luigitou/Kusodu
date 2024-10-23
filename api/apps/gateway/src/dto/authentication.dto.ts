import { IsEmail, IsString, IsUUID } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsString({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Password is required' })
  password: string;
}

export class LoginDto {
  @IsString({ message: 'Username is required' })
  username: string;

  @IsString({ message: 'Password is required' })
  password: string;
}

export class RefreshTokenDto {
  @IsString({ message: 'Refresh token is required' })
  refreshToken: string;

  @IsUUID('4', { message: 'User id is required' })
  userId: string;
}
