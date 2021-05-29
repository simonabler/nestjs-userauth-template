import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MysqlConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().default('localhost'),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_USERNAME: Joi.string().default('nestjs'),
        MYSQL_PASSWORD: Joi.string().default('nestjs'),
        MYSQL_DATABASE: Joi.string().default('nestjs'),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
