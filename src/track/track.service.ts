import { ForbiddenException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'
import { AlbumTrackService } from '@/album/album-track/album-track.service'

import { TrackDto } from './track.dto'
import { TrackLikeService } from './track-like/track-like.service'

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trackLikeService: TrackLikeService,
    private readonly albumTrackService: AlbumTrackService
  ) {}

  async checkMyTrack(profileId: number, trackId: number) {
    const myTracks = await this.getAllMy(profileId)
    return myTracks.some((track) => track.id === trackId)
  }

  async getAll() {
    return await this.prisma.track.findMany()
  }

  async getAllMy(profileId: number) {
    return await this.prisma.track.findMany({ where: { userId: profileId } })
  }

  async getOne(trackId: number) {
    return await this.prisma.track.findFirst({ where: { id: trackId } })
  }

  async create(profileId: number, dto: TrackDto) {
    return await this.prisma.track.create({
      data: { userId: profileId, ...dto },
    })
  }

  async update(profileId: number, trackId: number, dto: TrackDto) {
    const isMyTrack = await this.checkMyTrack(profileId, trackId)

    if (!isMyTrack)
      throw new ForbiddenException('Вы не являетесь владельцем трека!')

    const track = await this.getOne(trackId)

    return await this.prisma.track.update({
      where: { id: trackId },
      data: {
        duration: dto.duration || track.duration,
        previewUrl: dto.previewUrl || track.previewUrl,
        trackUrl: dto.trackUrl || track.trackUrl,
      },
    })
  }

  async delete(profileId: number, trackId: number) {
    const isMyTrack = await this.checkMyTrack(profileId, trackId)

    if (!isMyTrack) {
      throw new ForbiddenException('Вы не являетесь владельцем трека!')
    }

    await this.albumTrackService.deleteAllByProfileId(profileId)
    await this.trackLikeService.deleteAllByProfileId(profileId)

    return await this.prisma.track.delete({ where: { id: trackId } })
  }

  // async getAllLikedTracks(tracksId: number[]) {
  //   return await this.prisma.track.findMany({ where: { id: { in: tracksId } } })
  // }

  async deleteAllByProfileId(profileId: number) {
    return await this.prisma.track.deleteMany({ where: { userId: profileId } })
  }

  async getLikesLength(trackId: number) {
    return this.trackLikeService.getLength(trackId)
  }

  async updateLike(profileId: number, trackId: number) {
    return this.trackLikeService.update(profileId, trackId)
  }

  async checkLike(profileId: number, trackId: number) {
    return this.trackLikeService.check(profileId, trackId)
  }

  async getAllLikedTracks(profileId: number) {
    const likesId = await this.trackLikeService.getAllLikedId(profileId)
    return this.prisma.track.findMany({ where: { id: { in: likesId } } })
  }
}
