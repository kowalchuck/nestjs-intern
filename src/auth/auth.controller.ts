import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { User } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerData: RegisterDto): Promise<User | null> {
    return this.authService.register(registerData);
  }

  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }
}
