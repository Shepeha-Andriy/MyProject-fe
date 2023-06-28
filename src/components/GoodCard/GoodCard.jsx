import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { RiShoppingCart2Line, RiShoppingCart2Fill } from 'react-icons/ri'
import './goodcard.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/slices/userSlice'

export default function GoodCard({ good }) {
  const [isAdded, setIsAdded] = useState(false)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.cart) {
      const goods = Object.keys(user?.cart);
      setIsAdded(goods.some(x => x === good._id))
    }
  }, [user, good, isAdded]);

  const handleAddToCart = async () => {
    dispatch(addToCart({ productId: good._id, price: good.price }))
  }

  const handleRemoveFromCart = async () => {
    dispatch(removeFromCart({ productId: good._id, price: good.price }))
  }

  return (
    <div className='goodcard'>
      <Link to={'/good'} className='goodcard__img--wraper'><img src='../../assets/images/phones_category.jpg' alt='img' className='goodcard__img'></img></Link>
      <div className='goodcard__name'>
        {good.name}
      </div>
      <div className='goodcard__description'>
        <span className='goodcard__main--name'>{ good.shortDescription }</span>
      </div>

      <div className='goodcard__footer'>
        <span className='goodcard__views'>{ good.views }<AiOutlineEye></AiOutlineEye></span>
        {isAdded
          ? <button title='remove from cart' className='goodcard__cart' onClick={handleRemoveFromCart} disabled={!user}><RiShoppingCart2Fill></RiShoppingCart2Fill></button>
          : <button title='add to cart' className='goodcard__cart' onClick={handleAddToCart} disabled={!user}><RiShoppingCart2Line></RiShoppingCart2Line></button>
        }
        <span className='goodcard__price'>{ good.price }$</span>
      </div>
    </div>
  )
}
