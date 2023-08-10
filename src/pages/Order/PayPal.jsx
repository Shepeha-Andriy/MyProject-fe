import { PayPalButtons } from '@paypal/react-paypal-js'
import { createOrder, captureOrder } from '../../redux/slices/orderSlice'
import { useDispatch } from 'react-redux';

export const PayButton = ({ order }) => {
  const dispatch = useDispatch()
  
  //
  const handleCreateOrder = async (data, actions) => {
    const { description, price, items, amount } = data;
    
    const res = await dispatch(createOrder({ description, price, items, amount }))

    return res.payload.data.id
  };

  const onApprove = async (data, actions) => {
    const { orderID } = data;
    console.log(data)
    
    dispatch(captureOrder({ orderID }))
  };

  return (
    <PayPalButtons
      style={{ color: 'silver', layout: 'horizontal', height: 48, tagline: false, shape: 'pill' }}
      createOrder={(data, actions) => handleCreateOrder(order, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onError={() => { console.log('err') }}
      onCancel={() => { console.log('cancel') }}
    />
  );  
}
