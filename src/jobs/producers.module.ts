import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { HelloWorldProducer } from './producers/hello-world.producer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@10.64.0.184:5672'],
          queue: 'ematricQue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [HelloWorldProducer],
  exports: [HelloWorldProducer],
})
export class ProducerModule {}
