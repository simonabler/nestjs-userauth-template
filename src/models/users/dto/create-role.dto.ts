import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'user:create',
    description: 'Name of Role',
  })
  @Length(5, 20)
  @IsNotEmpty()
  readonly name: string;
}
