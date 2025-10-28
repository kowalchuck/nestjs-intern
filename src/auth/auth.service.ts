import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AUTHORIZATION_ERROR_MESSAGE } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, ...data }: RegisterDto): Promise<User | null> {
    const existing = await this.usersService.findByEmail(data.email);

    if (existing)
      throw new ConflictException('User with this email already exist');

    const salt = await bcrypt.genSalt(10);
    const pass_hash = await bcrypt.hash(password, salt);

    return this.usersService.create({ pass_hash, ...data });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmailWithHash(email);
    if (!user) throw new UnauthorizedException(AUTHORIZATION_ERROR_MESSAGE);

    const isValidPassword = await bcrypt.compare(password, user.pass_hash);
    if (!isValidPassword)
      throw new UnauthorizedException(AUTHORIZATION_ERROR_MESSAGE);

    return { access_token: await this.jwtService.signAsync(user) };
  }
}
