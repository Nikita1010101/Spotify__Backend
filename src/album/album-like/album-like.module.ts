import { Module } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'

import { AlbumLikeService } from './album-like.service'


@Module({
  providers: [AlbumLikeService, PrismaService],
})
export class AlbumLikeModule {}
