import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { OrderModule } from './order.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.URL}:${process.env.PORT}`,
      package: 'orders',
      protoPath: join(__dirname, './src/_proto/order.proto'),
      loader: {
        keepCase: true
      }
    }
  })

  return app.listenAsync()
}

bootstrap()
