import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  mockVerifyPaymentResult(order: any): string {
    this.logger.log('Mocking verify payment result');
    const rand = Math.floor(Math.random() * 10);

    return (rand % 2 === 0) ? 'verified' : 'decline';
  }
}
