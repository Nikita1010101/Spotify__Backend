import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'

import { AuthModule } from './auth/auth.module'
import { TrackModule } from './track/track.module'
import { MediaModule } from './media/media.module'
import { AlbumModule } from './album/album.module'
import { AlbumLikeModule } from './album/album-like/album-like.module'
import { TrackLikeModule } from './track/track-like/track-like.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    TrackModule,
    MediaModule,
    AlbumModule,
    TrackLikeModule,
    AlbumLikeModule,
    TrackLikeModule,
  ],
})
export class AppModule {}
