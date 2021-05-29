import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserRoleDto {
  @ApiProperty({
    isArray: true,
    example: '["create:user","update:user"]',
    description: 'Name of Roles',
  })
  @MaxLength(100, {
    each: true,
  })
  @IsNotEmpty()
  readonly roles: string[];
}
