import { OrderService } from './src/order.service';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrderStatus } from './src/models/order.entity';

@Processor('deliver_orders')
export class DeliverOrderProcessor {
  private readonly logger = new Logger(DeliverOrderProcessor.name);
  constructor(
    private orderService: OrderService
  ) { }
  @Process('delivered_order')
  async handleDeliverOrder(job: Job): Promise<any> {
    const order = job.data
    if (order.status === OrderStatus.CONFIRMED) {
      this.logger.log('mock change status of order from confirmed to delivered after 10 sec.');
      await this.orderService.deliveredOrder(order.order_id);
    }
  }
}