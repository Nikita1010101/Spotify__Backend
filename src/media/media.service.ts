import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { v4 as generateId } from 'uuid'

@Injectable()
export class MediaService {
  constructor(private readonly configService: ConfigService) {}

  async save(
    mediaFile: Express.Multer.File,
    folder: 'audio' | 'avatar' | 'preview',
  ) {
    const uploadFolder = `${path}/uploads/${folder}`
    await ensureDir(uploadFolder)

    const fileType = mediaFile.mimetype.split('/')[1]
    const fileId = generateId()
    const fullPath = `${uploadFolder}/${fileId}.${fileType}`

    writeFile(fullPath, mediaFile.buffer)

    const fileUrl = `${this.configService.get('APP_URL')}/uploads/${folder}/${fileId}.${fileType}`

    return { fileId, fileUrl }
  }
}
