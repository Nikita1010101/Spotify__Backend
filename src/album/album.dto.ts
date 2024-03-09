import { IsString } from "class-validator"

export class AlbumDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  previewUrl: string
}