import React, { useCallback, useEffect, useState } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCartGoods } from '../../redux/slices/cartSlice';
import CartItem from '../../components/CartItem/CartItem';
import { Loader } from '../../components/Loader/Loader'
import Pagination from '../../components/Pagination/Pagination';
import { NavLink } from 'react-router-dom';

export default function Cart() {
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useSelector(state => state.user)
  const { goods, pages, amount, cost, isLoading } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  
  const loadCart = useCallback(async () => { 
    dispatch(getCartGoods({page: currentPage}))
  }, [dispatch, currentPage])

  useEffect(() => {
    if (user) {
      loadCart()
    }
  }, [loadCart])

  if (!user) {
    return <h3>Sign In to add goods to cart</h3>
  }

  if (isLoading) {
    return <Loader></Loader>
  }

  if (goods?.length < 1) {
    return <h3>add goods to cart to see them here</h3>
  }
  
  return (
    <div className='cart'>   
      {
        <div>
          <div className='cart__wraper'>
            {
              goods?.map(good => (
                <CartItem key={good._id} good={good} className='cart__wraper--item'></CartItem>
              ))
            }

            <div className='cart__pursches'>
              {
                cost
              }
              <br></br>
              {
                amount
              }
            </div>
          </div>

          <div className='cart__pagination'>
            <div className='pagination'>
              <Pagination currentPage={currentPage} totalPages={pages} setPage={setCurrentPage}></Pagination>
            </div>
          </div>     
          
        </div>
      }

      <div>
        <NavLink to={'/order'}>by</NavLink>  
      </div>
    </div>
  )
}
