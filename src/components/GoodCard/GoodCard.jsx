import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { RiShoppingCart2Line, RiShoppingCart2Fill } from 'react-icons/ri'
import './goodcard.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice'

import { useSpring, useTransition, animated, config } from 'react-spring';

export default function GoodCard({ good }) {
  const [isAdded, setIsAdded] = useState(false)
  const { user } = useSelector(state => state.user)
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      const goods = Object.keys(items);
      setIsAdded(goods.some(x => x === good._id))
    }
  }, [user, good, isAdded, items]);

  const handleAddToCart = async () => {
    dispatch(addToCart({ productId: good._id, price: good.price }))
  }

  const handleRemoveFromCart = async () => {
    dispatch(removeFromCart({ productId: good._id, price: good.price }))
  }

  const [flipped, set] = useState(false)

  const { opacity, transform } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(900px) rotateY(${flipped ? 180 : 0}deg)`,
    config: config.gentle
  });

  return (
    <div className='rotateImg2'>
      <div className='rotateImg__container2'>
        <animated.div
          className="rotateImg__c2 rotateImg__back2"
          style={{
            opacity: opacity.to(o => 1 - o),
            display: flipped ? 'none' : 'flex',
            transform
          }}
        >
          <div className='goodcard'>
            <Link to={'/good'} className='goodcard__img--wraper'><img src='../../assets/images/phones_category.jpg' alt='img' className='goodcard__img'></img></Link>
            <div className='goodcard__name'>
              {good.name}
            </div>
            <div className='goodcard__description' onClick={() => set(!flipped)}>
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
        </animated.div>

        <animated.div
          className="rotateImg__c2 rotateImg__front2"
          style={{
            display: flipped ? 'flex' : 'none',
            opacity,
            transform: transform.to(t => `${t} rotateY(180deg)`)
          }}
        >
          <div className='goodcard'>
            <Link to={'/good'} className='goodcard__img--wraper'><img src='../../assets/images/phones_category.jpg' alt='img' className='goodcard__img'></img></Link>
            <div className='goodcard__name'>
              {good.name}
            </div>
            <div className='goodcard__description' onClick={() => set(!flipped)}>
              <span className='goodcard__main--name'>{ good.shortDescription }</span>
            </div>

            <div className='goodcard__footer'>
              <span className='goodcard__views'>{ good.views }<AiOutlineEye></AiOutlineEye></span>
              {isAdded
                ? <button title='remove from cart' className='goodcard__cart' onClick={handleRemoveFromCart} disabled={!user}><RiShoppingCart2Fill></RiShoppingCart2Fill></button>
                : <button title='add to cart' className='goodcard__cart' onClick={handleAddToCart} disabled={!user}><RiShoppingCart2Line></RiShoppingCart2Line></button>
              }
              <span className='goodcard__price'>{ good.price }$п</span>
            </div>
          </div>
          {/* <div className='test' onClick={() => set(!flipped)}>{ good.shortDescription }</div> */}
        </animated.div>
      </div>
    </div>
  )
}

 // <div className='goodcard'>
    //   <Link to={'/good'} className='goodcard__img--wraper'><img src='../../assets/images/phones_category.jpg' alt='img' className='goodcard__img'></img></Link>
    //   <div className='goodcard__name'>
    //     {good.name}
    //   </div>
    //   <div className='goodcard__description'>
    //     <span className='goodcard__main--name'>{ good.shortDescription }</span>
    //   </div>

    //   <div className='goodcard__footer'>
    //     <span className='goodcard__views'>{ good.views }<AiOutlineEye></AiOutlineEye></span>
    //     {isAdded
    //       ? <button title='remove from cart' className='goodcard__cart' onClick={handleRemoveFromCart} disabled={!user}><RiShoppingCart2Fill></RiShoppingCart2Fill></button>
    //       : <button title='add to cart' className='goodcard__cart' onClick={handleAddToCart} disabled={!user}><RiShoppingCart2Line></RiShoppingCart2Line></button>
    //     }
    //     <span className='goodcard__price'>{ good.price }$</span>
    //   </div>
    // </div>
    