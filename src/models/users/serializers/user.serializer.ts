import { Expose } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { Role } from '../entities/role.entity';
export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];
export class UserEntity extends ModelEntity implements IUser {
  id: string;
  email: string;
  name: null | string;
  username: null | string;
  roles: Role[];
  @Expose({ groups: ['user.password'] })
  password: string;
  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
