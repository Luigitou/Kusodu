import { IsObject, IsString } from 'class-validator';

export class SyncGameStateDto {
  @IsString()
  roomId: string;

  @IsObject()
  state: any;
}
