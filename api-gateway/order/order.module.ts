import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { join } from 'path';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'orders',
          url: 'order-service:50051',
          loader: {
            keepCase: true
          },
          protoPath: join(__dirname, './_proto/order.proto')
        }
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
