import { Module } from '@nestjs/common';
import { HelloWorldController } from './consumers/hello-world.consumer';

@Module({
  imports: [],
  controllers: [HelloWorldController],
  providers: [],
})
export class ConsumerModule {}
