import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { MediaService } from './media.service'
import { MediaController } from './media.controller'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
