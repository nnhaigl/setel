import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Order, OrderStatus } from './models/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/database.config';
import { Repository } from 'typeorm';
import { Queue } from 'bull';

describe('OrderService', () => {
  let orderRepository: Repository<Order> = new Repository();
  let proxy : ClientProxy
  let queue : Queue
  let orderService: OrderService;
  beforeAll(async () => {
    orderService = new OrderService(orderRepository, proxy, queue)
  });

  describe('getList', () => {
    it('it should success return success data', async () => {
      const date = new Date()
      jest.spyOn(orderRepository, 'findAndCount').mockResolvedValueOnce( [[
        {
          order_id: 1,
          customer_name: 'Customer 1',
          amount_money: 10,
          status: OrderStatus.CANCELLED,
          created_at: date,
          updated_at: date
        },
        {
          order_id: 2,
          customer_name: 'Customer 2',
          amount_money: 10,
          status: OrderStatus.CONFIRMED,
          created_at: date,
          updated_at: date
        }
      ],2]);

      expect(await orderService.getLists({ page: 1, perPage: 10 })).toStrictEqual({
        page: 1,
        perPage: 10,
        total: 2,
        data: [
          {
            order_id: 1,
            customer_name: 'Customer 1',
            amount_money: 10,
            status: 'cancelled',
            created_at: date,
            updated_at: date
          },
          {
            order_id: 2,
            customer_name: 'Customer 2',
            amount_money: 10,
            status: 'confirmed',
            created_at: date,
            updated_at: date
          }
        ]
      });
    })
  })
});
