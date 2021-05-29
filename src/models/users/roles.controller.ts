import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionsGuard } from 'src/authentication/permissions.guard';
import { ReS } from 'src/common/ReS.model';
import { RolesService } from './roles.service';
import { Permissions } from '../../authentication/decorators/permissions.decorator';
import { RoleEntity } from './serializers/role.serializer';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/authentication/jwt-auth.guard';

@ApiBearerAuth()
@Controller('roles')
@ApiTags('roles')
@UseGuards(JWTAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Permissions('create:role')
  @UseGuards(PermissionsGuard)
  async create(@Body() inputs: CreateRoleDto): Promise<ReS<RoleEntity>> {
    return ReS.FromData(await this.rolesService.create(inputs));
  }
}
