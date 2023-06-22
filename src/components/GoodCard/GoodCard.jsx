import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { RiShoppingCart2Line, RiShoppingCart2Fill } from 'react-icons/ri'
import './goodcard.scss'
import { Link } from 'react-router-dom'

export default function GoodCard() {

  const added = true

  return (
    <div className='goodcard'>
      <Link to={'/good'} className='goodcard__img--wraper'><img src='../../assets/images/phones_category.jpg' alt='img' className='goodcard__img'></img></Link>
      <div className='goodcard__name'>
        Iphone
      </div>
      <div className='goodcard__description'>
        <span className='goodcard__main--name'>DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION</span>
      </div>

      <div className='goodcard__footer'>
        <span className='goodcard__views'>300<AiOutlineEye></AiOutlineEye></span>
        {added
          ? <span title='remove from cart' className='goodcard__cart'><RiShoppingCart2Fill></RiShoppingCart2Fill></span>
          : <span title='add to cart' className='goodcard__cart'><RiShoppingCart2Line></RiShoppingCart2Line></span>
        }
        <span className='goodcard__price'>1399$</span>
      </div>
    </div>
  )
}
