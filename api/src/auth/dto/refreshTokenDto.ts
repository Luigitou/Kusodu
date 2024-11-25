import { IsNotEmpty, IsString } from 'class-validator';

export class refreshTokenDto {
  @IsString({ message: 'Invalid refresh token format' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken: string;
}
