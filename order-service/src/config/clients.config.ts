import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { PAYMENT_SERVICE } from '../constants/payment-service.constant';

export default registerAs('client_services', () => ({
  payment_queue: {
    name: PAYMENT_SERVICE,
    transport: Transport.NATS,
    options: {
      url: process.env.NATS_URI,
      queue: 'payment_queue',
    }
  },
  redis_server: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0,
    password: process.env.REDIS_PASSWORD || '',
  }
}));