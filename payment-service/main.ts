import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.NATS,
      options: {
        url: process.env.NATS_URI,
        queue: 'payment_queue',
      }
    }
  );
  app.listen(() => {logger.log('Payment Service is listening')});
}
bootstrap();
