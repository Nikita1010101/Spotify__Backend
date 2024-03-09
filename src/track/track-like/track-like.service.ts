import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'

@Injectable()
export class TrackLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async update(profileId: number, trackId: number) {
    const likeData = await this.prisma.trackLike.findFirst({
      where: { userId: profileId, trackId },
    })

    if (likeData) {
      return await this.prisma.trackLike.delete({ where: { id: likeData.id } })
    }

    return await this.prisma.trackLike.create({
      data: { userId: profileId, trackId },
    })
  }

  async check(profileId: number, trackId: number) {
    const likeData = await this.prisma.trackLike.findFirst({
      where: { userId: profileId, trackId },
    })

    return likeData ? true : false
  }

  async getLength(trackId: number) {
    return await this.prisma.trackLike.count({
      where: { trackId },
    })
  }

  async deleteAllByTrackId(trackId: number) {
    return await this.prisma.trackLike.deleteMany({ where: { trackId } })
  }

  async deleteAllByProfileId(profileId: number) {
    return await this.prisma.trackLike.deleteMany({
      where: { userId: profileId },
    })
  }

  async getAllLikedId(profileId: number) {
    const likes = await this.prisma.trackLike.findMany({
      where: { userId: profileId },
    })

    return likes.map((like) => like.trackId)
  }
}
