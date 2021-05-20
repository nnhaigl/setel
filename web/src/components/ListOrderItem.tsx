import { Button } from 'reactstrap';
import { ListOrderItemProps } from '../interfaces/props.interface';
import { OrderStatus }  from './OrderStatus';
const ORDER_API_URL: string = process.env.REACT_APP_ORDER_API_URL as string;

export function ListOrderItem({ index, data, reloadList }: ListOrderItemProps) {
  const cancelOrder = () => {
    const url = ORDER_API_URL + '/' + data.order_id + '/cancel'
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      reloadList();
    })
  }
  return (
    <tr>
      <td>{data.order_id}</td>
      <td>{data.customer_name}</td>
      <td>{data.amount_money}</td>
      <td>
        <OrderStatus status={data.status} />
      </td>
      <td>
        { data.status === 'created' ?
        <Button className="btn-sm"
              color="danger"
              onClick={cancelOrder}
            ><span className="glyphicon glyphicon-remove"></span>Cancel</Button>
        :""
      }
      </td>
    </tr>
  )
}