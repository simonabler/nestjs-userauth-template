import { Injectable, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HelloWorldProducer {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  getHello() {
    this.client.emit<any>('message_printed', {
      payload_ematric: 'This Is a Message',
    });
    return 'Hello World printed';
  }

  async withResponse() {
    this.client
      .send<any, any>(
        { cmd: 'sum' },
        {
          send_payload_ematric: 'This Is a Message',
        },
      )
      .subscribe((data) => {
        console.log('Return:', data);
      });
  }
}
