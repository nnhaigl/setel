import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  VERIFY_PAYMENT_OF_ORDER
} from './constants/payment.constant';
@Controller()
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private readonly paymentAppService: PaymentService) {}

  @MessagePattern(VERIFY_PAYMENT_OF_ORDER)
  async verifyPaymentOrder(@Payload() data: any): Promise<any> {
    this.logger.log('Handling message verify payment of order: ' + data.order_id + ' from Payment Queue.');
    const result = this.paymentAppService.mockVerifyPaymentResult(data);
    this.logger.log('payment verify result of order: ' + data.order_id + ' ' + result)
    return { result, order_id: data.order_id }
  }
}
