import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ACCESS_TOKEN_SECRET',
    });
  }

  async validate(payload: any): Promise<any> {
    const { sub } = payload;

    const user = await this.authService.findUser(sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
