import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { MysqlConfigModule } from './config/database/mysql/config.module';
import { ConsumerModule } from './jobs/consumers.module';
import { ProducerModule } from './jobs/producers.module';
import { UsersModule } from './models/users/users.module';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';

const ENV = process.env.NODE_ENV;
console.log(!ENV ? '.env' : `.env.${ENV}`)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MysqlDatabaseProviderModule,
    AuthModule,
    UsersModule,
    AppConfigModule,
    MysqlConfigModule,
    ConsumerModule,
    ProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
