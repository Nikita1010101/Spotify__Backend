import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'

import { AlbumTrackService } from './album-track.service'

@Module({
  providers: [AlbumTrackService, PrismaService],
})
export class AlbumTrackModule {}
