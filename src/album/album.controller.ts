import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { User } from '@prisma/client'

import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'

import { AlbumService } from './album.service'
import { AlbumDto } from './album.dto'
import { AlbumTrackDto } from './album-track/album-track.dto'
import { AlbumLikeDto } from './album-like/album-like.dto'

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser() user: User) {
    return await this.albumService.getAll(+user.id)
  }

  @Get(':albumId')
  @Auth()
  async getOne(@CurrentUser() user: User, @Param('albumId') albumId: string) {
    return await this.albumService.getOne(+user.id, +albumId)
  }

  @Post()
  @Auth()
  async create(@CurrentUser() user: User, @Body() dto: AlbumDto) {
    return await this.albumService.create(+user.id, dto)
  }

  @Post('track')
  @Auth()
  async addTrack(@CurrentUser() user: User, @Body() dto: AlbumTrackDto) {
    return await this.albumService.addTrack(+user.id, dto.albumId, dto.trackId)
  }

  @Patch(':albumId')
  @Auth()
  async update(
    @CurrentUser() user: User,
    @Param('albumId') albumId: string,
    @Body() dto: AlbumDto,
  ) {
    return await this.albumService.update(+user.id, +albumId, dto)
  }

  @Delete(':albumId')
  @Auth()
  async delete(@CurrentUser() user: User, @Param('albumId') albumId: string) {
    return await this.albumService.delete(+user.id, +albumId)
  }

  @Delete('track/:trackId')
  @Auth()
  async deleteTrack(@Param('trackId') trackId: string) {
    return await this.albumService.deleteTrack(+trackId)
  }

  @HttpCode(HttpStatus.OK)
  @Post('like')
  @Auth()
  async updateLike(@CurrentUser() user: User, @Body() dto: AlbumLikeDto) {
    return this.albumService.updateLike(+user.id, dto.albumId)
  }

  @Get('like/check/:albumId')
  @Auth()
  async check(@CurrentUser() user: User, @Param('albumId') albumId: string){
    return await this.albumService.checkLike(+user.id, +albumId)
  }

  @Get('like/length/:albumId')
  async getLength(@Param('albumId') albumId: string){
    return await this.albumService.getLikedLength(+albumId)
  }

  @Get('like/albums')
  @Auth()
  async getAllLikedAlbums(@CurrentUser() user: User) {
    return this.albumService.getAllLikedAlbums(+user.id)
  }  
}
