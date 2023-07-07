import React from 'react'
import './cartitem.scss'
import { Link } from 'react-router-dom'
import { MdArrowForwardIos, MdArrowBackIosNew  } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCart, increaseCart } from '../../redux/slices/cartSlice';

export default function CartItem({ good }) {
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleIncrease = async () => {
    dispatch(increaseCart({ productId: good._id, price: good.price }))
  }

  const handleDecrease = async () => {
    dispatch(decreaseCart({ productId: good._id, price: good.price }))
  }
  
  return (
    <div className='cartitem'>
      <Link to={'/good'} className='cartitem__img--wraper'><img src='../../assets/images/phones_category.jpg' alt='img' className='cartitem__img'></img></Link>
      <div>
         <div className='cartitem__name'>
          {good?.name}
        </div>
        <div className='cartitem__description'>
          <span className='cartitem__main--name'>{ good?.shortDescription }</span>
        </div>
      </div>
      
      <div>
        <div className='cartitem__quantity'>
        <MdArrowBackIosNew onClick={handleDecrease}></MdArrowBackIosNew>
        { items[good._id] }
        <MdArrowForwardIos onClick={handleIncrease}></MdArrowForwardIos>
        </div>
        
        <div className='cartitem__price'>
          { items[good._id]  * good.price}
        </div>
      </div>

    </div>
  )
}
