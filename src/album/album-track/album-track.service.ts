import { BadRequestException, Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma.service'

@Injectable()
export class AlbumTrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(albumId: number, trackId: number) {
    const item = await this.prisma.albumItem.findFirst({
      where: { albumId, trackId },
    })

    if (item) throw new BadRequestException('Album item exist yet!')

    return await this.prisma.albumItem.create({ data: { albumId, trackId } })
  }

  async delete(albumItemId: number) {
    return await this.prisma.albumItem.delete({
      where: { id: albumItemId },
    })
  }

  async deleteAllByProfileId(albumId: number) {
    return await this.prisma.albumItem.deleteMany({
      where: { albumId },
    })
  }
}
