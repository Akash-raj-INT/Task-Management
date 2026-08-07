import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { AuthService } from './auth.service';

class GuestLoginDto {
  @IsOptional()
  @IsString()
  @MaxLength(60)
  displayName?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest')
  guestLogin(@Body() dto: GuestLoginDto) {
    return this.authService.guestLogin(dto.displayName);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req) {
    return req.user;
  }
}
