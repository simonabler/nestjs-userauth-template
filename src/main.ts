import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppConfigService } from './config/app/config.service';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get('AppConfigService');

  console.log(appConfig.url)
  app.setGlobalPrefix('api/v1');

  bootstrapSwagger(app, appConfig);

  await bootstrapMicroservices(app, appConfig);

  await app.listen(appConfig.port);
}

function bootstrapSwagger(app: INestApplication, appConfig: AppConfigService) {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addServer(appConfig.url + '/api/v1/', 'v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v1/doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
  });
}

async function bootstrapMicroservices(
  app: INestApplication,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _appConfig: AppConfigService,
) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://guest:guest@10.64.0.184`],
      queue: 'ematricQue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservicesAsync();
}

bootstrap();
