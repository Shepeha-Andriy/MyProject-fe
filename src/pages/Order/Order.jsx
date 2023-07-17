import React from 'react'
import './order.scss'
import { PayB } from './PayPal'

export default function Order() {
  const product = {
    description: 'test',
    price: 1
  }

  return (
    <div className='order'>
      Order 
      <PayB product={product}></PayB>
    </div>
  )
}
