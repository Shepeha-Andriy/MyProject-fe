import React, { useCallback, useEffect } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/slices/goodSlice';

export default function Cart() {
  const { user } = useSelector(state => state.user)
  const { goods, isLoading } = useSelector(state => state.good)
  const dispatch = useDispatch()
  
  const loadCart = useCallback(async () => { 
    console.log(user)
    dispatch(getCart({page: 1, userId: user?._id}))
  }, [dispatch, user])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  return (
    <div className='cart'>
      Cart
    </div>
  )
}
