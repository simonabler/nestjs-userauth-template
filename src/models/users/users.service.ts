import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RolesService } from './roles.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
  ) {}

  get(
    id: string,
    relations: string[] = [],
    throwsException = true,
  ): Promise<UserEntity | null> {
    return this.usersRepository.get(id, relations, throwsException);
  }

  getAll(
    relations: string[] = [],
    throwsException = true,
  ): Promise<UserEntity[] | null> {
    return this.usersRepository.findAll(relations, throwsException);
  }

  async getByName(
    name: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UserEntity | null> {
    return this.usersRepository
      .findOne({
        where: { username: name },
        relations,
      })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(
          entity ? this.usersRepository.transform(entity) : null,
        );
      })
      .catch((error) => Promise.reject(error));
  }
  async create(inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.createEntity(inputs);
  }
  async update(user: UserEntity, inputs: UpdateUserDto): Promise<UserEntity> {
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async updateUserRole(
    user: UserEntity,
    inputs: UpdateUserRoleDto,
  ): Promise<UserEntity> {
    const roles = await this.rolesService.getByNamesRaw(inputs.roles, [], true);
    user.roles = roles;
    return await this.usersRepository.save(user);
  }
}
