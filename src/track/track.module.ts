import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'
import { TrackLikeService } from '@/track/track-like/track-like.service'
import { AlbumTrackService } from '@/album/album-track/album-track.service'

import { TrackService } from './track.service'
import { TrackController } from './track.controller'

@Module({
  controllers: [TrackController],
  providers: [TrackService, PrismaService, TrackLikeService, AlbumTrackService],
})
export class TrackModule {}
