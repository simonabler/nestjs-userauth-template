import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/models/users/dto/login-response.dto';
import { UserEntity } from 'src/models/users/serializers/user.serializer';
import { UsersService } from '../models/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findUser(id: string): Promise<any> {
    const user = await this.usersService.get(id, ['roles']);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity): Promise<LoginResponseDto> {
    const { id } = user;
    const payload = { username: user.username, sub: id };
    const expiresIn = 60 * 60 * 24 * 30;

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn,
      }),
      user,
      expiresIn,
    };
  }
}
