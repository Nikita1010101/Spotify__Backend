import { IsNumber } from "class-validator";

export class AlbumLikeDto {
  @IsNumber()
  albumId: number
}