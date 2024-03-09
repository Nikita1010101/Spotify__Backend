import { IsNumber } from "class-validator";

export class TrackLikeDto {
  @IsNumber()
  trackId: number
}