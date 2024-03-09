import { IsNumber, IsString } from 'class-validator'

export class TrackDto {
  @IsString()
  trackUrl: string

  @IsNumber()
  duration: number

  @IsString()
  previewUrl: string
}
