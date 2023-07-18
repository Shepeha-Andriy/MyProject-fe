import api from '../../redux/api';
import { PayPalButtons } from '@paypal/react-paypal-js'

export const PayButton = ({ product }) => {
  
  const createOrder = async (data, actions) => {
    
    try {
      const response = await api.post('/order/create', {
      product: {
        description: data.description,
        price: data.price
      }}
      )
      
      return response.data.data.id
    } catch (error) {
      console.log('ree')
    }
  };

  const onApprove = async (data, actions) => {
   console.log(data)
    try {
      const response = await api.post('/order/capture', {
          orderID: data.orderID
        } 
      )
      
      console.log(response)
      return response.data
    } catch (error) {
      console.log('ree')
    }
  };

  return (
    <PayPalButtons
      style={{ color: 'silver', layout: 'horizontal', height: 48, tagline: false, shape: 'pill' }}
      createOrder={(data, actions) => createOrder(product, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onError={() => { console.log('err') }}
      onCancel={() => { console.log('cancel') }}
    />
  );  
}
