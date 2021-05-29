import { EntityRepository } from 'typeorm';
import { ModelRepository } from '../model.repository';
import {
  allUserGroupsForSerializing,
  UserEntity,
} from './serializers/user.serializer';
import { classToPlain, plainToClass } from 'class-transformer';
import { Role } from './entities/role.entity';
import { RoleEntity } from './serializers/role.serializer';
@EntityRepository(Role)
export class RolesRepository extends ModelRepository<Role, RoleEntity> {
  transform(model: Role): RoleEntity {
    const tranformOptions = {
      groups: allUserGroupsForSerializing,
    };
    return plainToClass(
      UserEntity,
      classToPlain(model, tranformOptions),
      tranformOptions,
    );
  }
  transformMany(models: Role[]): RoleEntity[] {
    return models.map((model) => this.transform(model));
  }
}
