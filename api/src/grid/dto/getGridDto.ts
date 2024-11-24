import { IsEnum, IsNotEmpty } from 'class-validator';
import { Difficulty } from '@app/grid-generator';

export class GetGridDto {
  @IsEnum(Difficulty, { message: 'Difficulty is not valid' })
  @IsNotEmpty({ message: 'Difficulty is required' })
  difficulty: keyof typeof Difficulty;
}
