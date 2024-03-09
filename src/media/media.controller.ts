import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { Auth } from '@/auth/decorators/auth.decorator'

import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('media'))
  async uploadFile(
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder?: 'audio' | 'avatar' | 'preview',
  ) {
    return await this.mediaService.save(mediaFile, folder)
  }
}
