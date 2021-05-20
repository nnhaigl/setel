export enum OrderStatusEnum {
  CREATED = "created",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  DELIVERED = 'delivered'
}

export interface ListOrdersProps {
  onOrderCreated: Function;
  hasNewOrder: boolean;
}
export interface OrderItem {
  order_id: number;
  customer_name: string;
  amount_money: number;
  status: OrderStatusEnum | string;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface PaginateListOrders {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
  data: OrderItem[] | undefined;
}

export interface ListOrderItemProps {
  data: OrderItem;
  index: number;
  reloadList: Function;
}

export interface ModalCreateOrderProps {
  isOpen: boolean;
  onOrderCreated: Function;
  toggle: any;
}

export interface ModalDetailOrderProps {
  isOpen: boolean;
  toggle: any;
  reloadList: Function;
  data: OrderItem;
}

export interface PaginatorProps {
  currentPage: number;
  lastPage: number;
  paginate: Function;
}

export interface OrderStatusProps {
  status: OrderStatusEnum | string;
}