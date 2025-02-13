import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InputCellDto {
  @IsObject()
  state: any;

  @IsString()
  roomId: string;
}

class ErrorCellDto {
  @IsNumber()
  row: number;

  @IsNumber()
  col: number;

  @IsNumber()
  value: number;
}

export class GameStateDto {
  @IsObject()
  grid: object;

  @IsNumber()
  lives: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ErrorCellDto)
  errorCells: ErrorCellDto[];
}
