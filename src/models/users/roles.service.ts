import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';
import { RoleEntity } from './serializers/role.serializer';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {}

  get(
    id: string,
    relations: string[] = [],
    throwsException = true,
  ): Promise<RoleEntity | null> {
    return this.rolesRepository.get(id, relations, throwsException);
  }

  async getByName(
    name: string,
    relations: string[] = [],
    throwsException = false,
  ): Promise<RoleEntity | null> {
    return this.rolesRepository
      .findOne({
        where: { name },
        relations,
      })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(
          entity ? this.rolesRepository.transform(entity) : null,
        );
      })
      .catch((error) => Promise.reject(error));
  }

  async create(inputs: CreateRoleDto): Promise<RoleEntity> {
    return await this.rolesRepository.createEntity(inputs);
  }

  async getByNamesRaw(
    names: string[],
    relations: string[] = [],
    throwsException = false,
  ): Promise<Role[] | null> {
    return this.rolesRepository
      .find({
        where: { name: In(names) },
        relations,
      })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ? entity : null);
      })
      .catch((error) => Promise.reject(error));
  }
}
