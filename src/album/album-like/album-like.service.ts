import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'

@Injectable()
export class AlbumLikeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async update(profileId: number, albumId: number) {
    const likeData = await this.prisma.albumLike.findFirst({
      where: { userId: profileId, albumId },
    })

    if (likeData) {
      return await this.prisma.albumLike.delete({ where: { id: likeData.id } })
    }

    return await this.prisma.albumLike.create({
      data: { userId: profileId, albumId },
    })
  }

  async check(profileId: number, albumId: number) {
    const likeData = await this.prisma.albumLike.findFirst({
      where: { userId: profileId, albumId },
    })

    return likeData ? true : false
  }

  async getLength(albumId: number) {
    return await this.prisma.albumLike.count({
      where: { albumId },
    })
  }

  async deleteAllByAlbumId(albumId: number) {
    return await this.prisma.albumLike.deleteMany({ where: { albumId } })
  }

  async deleteAllByProfileId(profileId: number) {
    return await this.prisma.albumLike.deleteMany({
      where: { userId: profileId },
    })
  }

  async getAllLikedId(profileId: number) {
    const likes = await this.prisma.albumLike.findMany({
      where: { userId: profileId },
    })

    return likes.map((like) => like.albumId)
  }
}
