import { Injectable } from '@nestjs/common';

// TODO: remove this and add health checks

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
