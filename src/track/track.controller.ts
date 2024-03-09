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

import { TrackService } from './track.service'
import { TrackDto } from './track.dto'
import { TrackLikeDto } from './track-like/track-like.dto'

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll() {
    return await this.trackService.getAll()
  }

  @Get(':trackId')
  async getOne(@Param('trackId') trackId: string) {
    return await this.trackService.getOne(+trackId)
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @Auth()
  async create(@CurrentUser() user: User, @Body() dto: TrackDto) {
    return await this.trackService.create(+user.id, dto)
  }

  @Patch(':trackId')
  @Auth()
  async update(
    @CurrentUser() user: User,
    @Param('trackId') trackId: string,
    @Body() dto: TrackDto,
  ) {
    return await this.trackService.update(+user.id, +trackId, dto)
  }

  @Delete(':trackId')
  @Auth()
  async delete(@CurrentUser() user: User, @Param('trackId') trackId: string) {
    return await this.trackService.delete(+user.id, +trackId)
  }

  @Get('like/length/:trackId')
  async getLikesLength(@Param('trackId') trackId: string) {
    return await this.trackService.getLikesLength(+trackId)
  }

  @Post('like/update')
  @Auth()
  async updateLike(@CurrentUser() user: User, @Body() dto: TrackLikeDto) {
    return await this.trackService.updateLike(+user.id, +dto.trackId)
  }

  @Get('like/check/:trackId')
  @Auth()
  async checkLike(@CurrentUser() user: User, @Param('trackId') trackId: string){
    return await this.trackService.checkLike(+user.id, +trackId)
  }

  @Get('like/tracks')
  @Auth()
  async getAllLikedTracks(@CurrentUser() user: User) {
    return await this.trackService.getAllLikedTracks(+user.id)
  }
}
