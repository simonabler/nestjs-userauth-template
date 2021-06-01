import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class HelloWorldController {
  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log('HelloWorldController', data.payload_ematric);
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: any): any {
    console.log('HelloWorldController', data);
    return { emreturn: 'Payload' };
  }
}
