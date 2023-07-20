import React from 'react'
import './order.scss'
import { PayButton } from './PayPal'
import Selector from './Location'


export default function Order() {
  const product = {
    description: 'test',
    price: 1
  }

  return (
    <div className='order'>
      <Selector></Selector>/

      Order 
      <PayButton product={product}></PayButton>
    </div>
  )
}
