import { 
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import { useState } from 'react';
import { ModalCreateOrderProps } from '../interfaces/props.interface';
const ORDER_API_URL: string = process.env.REACT_APP_ORDER_API_URL as string;

export function ModalCreateOrder(props: ModalCreateOrderProps) {
  let [customerName, setCustomerName] = useState('');
  let [setAddress] = useState('');
  let [setPhone] = useState('');
  let [setDeliveryDate] = useState('');
  let [amountMoney, setAmountMoney] = useState<number | string>(0);

  const submit = () => {
    const reqData = {
      customer_name: customerName,
      amount_money: !Number.isNaN(amountMoney) ? parseFloat(amountMoney.toString()) : 0,
    };

    fetch(ORDER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(reqData)
    }).then((res) => res.json())
    .then(result => {
      alert('Order was created successfully!')
      props.onOrderCreated()
      refreshForm();
      props.toggle()
    }, (err) => {
      alert('Order create fail!')
    });
  }

  const refreshForm = () => {
    setCustomerName('');
    setAmountMoney(0);
  }

  return (
    <Modal 
      isOpen={props.isOpen}
      toggle={props.toggle}
    >
      <ModalHeader>
        Create Order
      </ModalHeader>
      <ModalBody>
        <form className="form form-horizontal">
          <FormGroup>
            <Label><b>Customer Name:</b></Label>
            <Input 
              type="text"
              name="customer_name" 
              value={customerName}
              placeholder="Enter customer name..."
              onChange={(e) => { setCustomerName(e.target.value) }}
            />
          </FormGroup>
          <FormGroup>
            <Label><b>Amount of Money:</b></Label>
            <Input 
              type="number" 
              name="amount_money"
              value={amountMoney}
              placeholder="Enter Amount of money..."
              onChange={(e) => {
                let value: number | string = !Number.isNaN(parseFloat(e.target.value)) ? parseFloat(e.target.value) : '';
                setAmountMoney(value);
              }}
            />
          </FormGroup>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={submit}
        >Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}
