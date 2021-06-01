import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './authentication/auth.service';
import { LoginDto } from './authentication/dto/login.dto';
import { JWTAuthGuard } from './authentication/jwt-auth.guard';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { ReS } from './common/ReS.model';
import { HelloWorldProducer } from './jobs/producers/hello-world.producer';
import { EntityBeingQueried } from './models/users/decorators/user.decorator';
import { LoginResponseDto } from './models/users/dto/login-response.dto';
import { UserEntity } from './models/users/serializers/user.serializer';

@Controller('auth')
@ApiTags('authorisation')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private prod: HelloWorldProducer,
  ) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('/login')
  async login(
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _loginDto: LoginDto,
  ): Promise<ReS<LoginResponseDto>> {
    return ReS.FromData(await this.authService.login(req.user));
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  @ApiBearerAuth()
  getHello(@EntityBeingQueried() user: UserEntity): ReS<string> {
    return ReS.FromData(this.appService.getHello() + ' ' + user.username);
  }
}
