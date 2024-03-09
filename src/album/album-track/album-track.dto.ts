import { IsNumber } from 'class-validator'

export class AlbumTrackDto {
  @IsNumber()
  albumId: number

  @IsNumber()
  trackId: number
}
