import React from 'react'
import './order.scss'
import { PayButton } from './PayPal'
import Selector from './Location'
import DownloadOrderInfo from './DownloadOrderInfo'


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
      <DownloadOrderInfo></DownloadOrderInfo>
    </div>
  )
}
