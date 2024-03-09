import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { REFRESH_TOKEN } from '@/constants/token.constant'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshDto } from './dto/refresh-token.dto'
import { Auth } from './decorators/auth.decorator'
import { EditUserDto } from './dto/edit-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Delete('delete')
  async delete(@Req() req: Request) {
    const { refreshToken } = req.cookies as RefreshDto
    return await this.authService.delete(refreshToken)
  }

  @Patch('edit')
  async edit(@Req() req: Request, @Body() dto: EditUserDto) {
    const { refreshToken } = req.cookies as RefreshDto
    return await this.authService.edit(refreshToken, dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(dto)
    res.cookie(REFRESH_TOKEN, data.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    return data
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @Auth()
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies as RefreshDto
    await this.authService.logout(refreshToken)
    res.clearCookie(REFRESH_TOKEN)
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies as RefreshDto
    const data = await this.authService.refresh(refreshToken)
    res.cookie(REFRESH_TOKEN, data.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    return data
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async registration(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.register(dto)
    res.cookie(REFRESH_TOKEN, data.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })

    return data
  }
}
