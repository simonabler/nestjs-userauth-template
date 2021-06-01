import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'trinhchin',
    description: 'The name of the User',
  })
  @Length(2, 20)
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    example: '0',
    description: 'The password of the User',
  })
  @IsNotEmpty()
  readonly password: string;
}
