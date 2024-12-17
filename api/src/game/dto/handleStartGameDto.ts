import { IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HandleStartGameDto {
  @IsObject()
  state: object;
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
  timer: number;

  @IsNumber()
  lives: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ErrorCellDto)
  errorCells: ErrorCellDto[];
}
