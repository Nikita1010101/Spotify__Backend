import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'
import { AlbumLikeService } from '@/album/album-like/album-like.service'
import { TrackService } from '@/track/track.service'

import { AlbumService } from './album.service'
import { AlbumController } from './album.controller'
import { AlbumTrackModule } from './album-track/album-track.module'
import { AlbumTrackService } from './album-track/album-track.service'
import { TrackLikeService } from '@/track/track-like/track-like.service'

@Module({
  imports: [AlbumTrackModule],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    TrackService,
    TrackLikeService,
    AlbumTrackService,
    PrismaService,
    AlbumLikeService,
  ],
})
export class AlbumModule {}
