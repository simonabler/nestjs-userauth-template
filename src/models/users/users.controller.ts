import {
  Get,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
  Param,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  UserEntity,
  extendedUserGroupsForSerializing,
} from './serializers/user.serializer';
import { UsersService } from './users.service';
import { EntityBeingQueried } from './decorators/user.decorator';
import { Permissions } from '../../authentication/decorators/permissions.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { JWTAuthGuard } from '../../authentication/jwt-auth.guard';
import { ReS } from 'src/common/ReS.model';
import { PermissionsGuard } from 'src/authentication/permissions.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApiReS } from 'src/common/decorators/ApiReS.decorator';

@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
@UseGuards(JWTAuthGuard)
@ApiExtraModels(ReS)
@ApiResponse({ status: 403, description: 'Forbidden.' })
@SerializeOptions({
  groups: extendedUserGroupsForSerializing,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(
    @Param('id') id: string,
    @EntityBeingQueried() user: UserEntity,
  ): Promise<ReS<UserEntity>> {
    return ReS.FromData(await this.usersService.get(id, ['roles']));
  }

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll(): Promise<ReS<UserEntity[]>> {
    return ReS.FromData(await this.usersService.getAll(['roles']));
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Permissions('create:user')
  @UseGuards(PermissionsGuard)
  @ApiReS(CreateUserDto, 'The record has been successfully created.', 201)
  async create(@Body() inputs: CreateUserDto): Promise<ReS<UserEntity>> {
    console.log(inputs);
    return ReS.FromData(await this.usersService.create(inputs));
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Permissions('update:user')
  @UseGuards(PermissionsGuard)
  async update(
    @Param('id') id: string,
    @EntityBeingQueried() user: UserEntity,
    @Body()
    inputs: UpdateUserDto,
  ): Promise<ReS<UserEntity>> {
    console.log(user);
    const userToUpdate = await this.usersService.get(id);
    return ReS.FromData(await this.usersService.update(userToUpdate, inputs));
  }

  @Patch('/:id/role')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Permissions('update:userrole')
  @UseGuards(PermissionsGuard)
  async updateRole(
    @Param('id') id: string,
    @EntityBeingQueried() user: UserEntity,
    @Body()
    inputs: UpdateUserRoleDto,
  ): Promise<ReS<UserEntity>> {
    const userToUpdate = await this.usersService.get(id);
    return ReS.FromData(
      await this.usersService.updateUserRole(userToUpdate, inputs),
    );
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(@Param('id') id: string): Promise<ReS<null>> {
    await this.usersService.delete(id, true);
    return ReS.FromData(null);
  }
}
