import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
export const defaultRoleGroupsForSerializing: string[] = ['user.timestamps'];
export const allRoleGroupsForSerializing: string[] = [
  ...defaultRoleGroupsForSerializing,
];
export class RoleEntity extends ModelEntity {
  id: string;
  name: null | string;
  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;
  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
