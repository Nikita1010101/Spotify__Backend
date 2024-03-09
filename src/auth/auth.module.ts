import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'


import { PrismaService } from '@/prisma.service'
import { AlbumTrackService } from '@/album/album-track/album-track.service'
import { AlbumService } from '@/album/album.service'
import { TrackService } from '@/track/track.service'
import { AlbumLikeService } from '@/album/album-like/album-like.service'
import { TrackLikeService } from '@/track/track-like/track-like.service'
import { getJwtConfig } from '@/config/jwt.config'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    AlbumTrackService,
    AlbumService,
    TrackService,
    AlbumLikeService,
    TrackLikeService,
  ],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class AuthModule {}
