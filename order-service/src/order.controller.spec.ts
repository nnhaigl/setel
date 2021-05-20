import { Order, OrderStatus } from './models/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  beforeAll(async () => {
    orderService = new OrderService(null, null, null)
    orderController = new OrderController(orderService)
  });

  describe('get paginated list orders', () => {
    it('it should return correctly data', async () => {
      const mockListOrdersResult = {
        page: 1,
        perPage: 10,
        total: 2,
        data: [
          {
            order_id: 1,
            customer_name: 'Customer 1',
            amount_money: 10,
            status: 'cancelled',
            created_at: '2020-12-07T12:03:04.000Z',
            updated_at: '2020-12-07T12:03:04.000Z'
          },
          {
            order_id: 2,
            customer_name: 'Customer 2',
            amount_money: 10,
            status: 'confirmed',
            created_at: '2020-12-07T12:05:06.000Z',
            updated_at: '2020-12-07T12:05:06.000Z'
          }
        ]
      }

      jest.spyOn(orderService, 'getLists').mockImplementation(async (options) => mockListOrdersResult);

      expect(await orderController.getLists({ page: 1, perPage: 10 })).toBe(mockListOrdersResult);
    })
  });

  describe('Create new Order', () => {
    it('it should create new record in order', async () => {
      const mockCreateOrderRes = {
        order_id: 3,
        customer_name: 'Customer 3',
        amount_money: 12,
        status: OrderStatus.CONFIRMED,
        created_at: new Date(2020, 12, 7, 12, 6, 6),
        updated_at: new Date(2020, 12, 7, 12, 6, 7),
      };
      const orderInput = {
        customer_name: 'Customer 3',
        delivery_date: new Date(2020, 12, 22),
        amount_money: 12,
      }
      jest.spyOn(orderService, 'createOrder').mockImplementation(async (orderInp) => mockCreateOrderRes);
      expect(await orderController.createOrder(orderInput)).toBe(mockCreateOrderRes);
    })
  })

  describe('Cancel Order', () => {
    it('it should update order status', async () => {
      const mockCancelRes = {
        order_id: 3,
        customer_name: 'Customer 3',
        amount_money: 12,
        status: OrderStatus.CANCELLED,
        created_at: new Date(2020, 12, 7, 12, 6, 6),
        updated_at: new Date(2020, 12, 7, 12, 6, 7),
      }
      jest.spyOn(orderService, 'getDetail').mockResolvedValue({
        order_id: 3,
        status: OrderStatus.CONFIRMED
      } as unknown as Order);
      jest.spyOn(orderService, 'updateStatus').mockImplementation(async (orderId, status) => mockCancelRes);
      expect(await orderController.cancelOrder({ order_id: 3 })).toBe(mockCancelRes);
    })
  })
});
