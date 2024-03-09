import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'

import { TrackLikeService } from './track-like.service'

@Module({
  providers: [TrackLikeService, PrismaService],
})
export class TrackLikeModule {}
