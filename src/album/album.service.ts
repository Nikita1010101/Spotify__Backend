import { BadRequestException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'
import { AlbumLikeService } from '@/album/album-like/album-like.service'
import { TrackService } from '@/track/track.service'

import { AlbumDto } from './album.dto'
import { AlbumTrackService } from './album-track/album-track.service'

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trackService: TrackService,
    private readonly albumTrackService: AlbumTrackService,
    private readonly albumLikeService: AlbumLikeService,
  ) {}

  private async checkAndFind(profileId: number, albumId: number) {
    const album = await this.prisma.album.findUnique({
      where: {
        id: albumId,
        userId: profileId,
      },
    })

    if (!album) throw new BadRequestException('Album not found!')

    return album
  }

  async getAll(profileId: number) {
    const albums = await this.prisma.album.findMany({
      where: { userId: profileId },
      include: {
        albumItem: {
          include: { track: true },
        },
      },
    })

    return albums.map(({ albumItem, ...album }) => ({
      ...album,
      tracks: albumItem.map((item) => ({
        ...item.track,
        albumItemId: item.id,
      })),
    }))
  }

  async getOne(profileId: number, albumId: number) {
    const existAlbum = await this.prisma.album.findUnique({
      where: {
        id: albumId,
        userId: profileId,
      },
      include: {
        albumItem: {
          include: { track: true },
        },
      },
    })

    if (!existAlbum) throw new BadRequestException('Album not found!')

    const { albumItem, ...album } = existAlbum

    return {
      ...album,
      tracks: albumItem.map((item) => ({
        ...item.track,
        albumItemId: item.id,
      })),
    }
  }

  async create(profileId: number, dto: AlbumDto) {
    return await this.prisma.album.create({
      data: {
        description: dto.description,
        previewUrl: dto.previewUrl,
        title: dto.title,
        userId: profileId,
      },
    })
  }

  async addTrack(profileId: number, albumId: number, trackId: number) {
    await this.checkAndFind(profileId, albumId)
    return await this.albumTrackService.create(albumId, trackId)
  }

  async update(profileId: number, albumId: number, dto: AlbumDto) {
    const album = await this.checkAndFind(profileId, albumId)

    return await this.prisma.album.update({
      where: {
        id: albumId,
        userId: profileId,
      },
      data: {
        description: dto.description || album.description,
        previewUrl: dto.previewUrl || album.previewUrl,
        title: dto.title || album.title,
      },
    })
  }

  async delete(profileId: number, albumId: number) {
    await this.checkAndFind(profileId, albumId)
    await this.albumTrackService.deleteAllByProfileId(profileId)
    await this.albumLikeService.deleteAllByProfileId(profileId)

    return await this.prisma.album.delete({
      where: { id: albumId, userId: profileId },
    })
  }

  async deleteTrack(albumItemId: number) {
    return await this.albumTrackService.delete(albumItemId)
  }

  async deleteAllByProfileId(profileId: number) {
    return await this.prisma.album.deleteMany({ where: { userId: profileId } })
  }

  async updateLike(profileId: number, albumId: number) {
    return this.albumLikeService.update(profileId, albumId)
  }

  async getLikedLength(albumId: number) {
    return this.albumLikeService.getLength(albumId)
  }

  async checkLike(profileId: number, albumId: number) {
    return this.albumLikeService.check(profileId, albumId)
  }

  async getAllLikedAlbums(profileId: number) {
    const likedId = await this.albumLikeService.getAllLikedId(profileId)
    return this.prisma.album.findMany({ where: { id: { in: likedId } } })
  }
}
