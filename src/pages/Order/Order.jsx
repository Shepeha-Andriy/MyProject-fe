import React from 'react'
import './order.scss'
import { PayButton } from './PayPal'
import Selector from './Location'
import DownloadOrderInfo from './DownloadOrderInfo'
import { useSelector } from 'react-redux'


export default function Order() {
  const { items, amount, cost } = useSelector(state => state.cart)

  const order = {
    items,
    price: cost,
    amount,
    description: 'test'
  }

  return (
    <div className='order'>
      <Selector></Selector>/

      Order 
      <PayButton order={order}></PayButton>
      <DownloadOrderInfo></DownloadOrderInfo>
    </div>
  )
}
