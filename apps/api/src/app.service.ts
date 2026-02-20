import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      service: 'emailcadence-api',
      version: '1.0.0',
      environment: process.env.NODE_ENV ?? 'development',
    };
  }
}
