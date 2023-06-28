import React, { useCallback, useEffect, useState } from 'react'
import './cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/slices/goodSlice';
import CartItem from '../../components/CartItem/CartItem';
import { Loader } from '../../components/Loader/Loader'
import Pagination from '../../components/Pagination/Pagination';

export default function Cart() {
  const [page, setPage] = useState(1)
  const { user } = useSelector(state => state.user)
  const { goods, isLoading } = useSelector(state => state.good)
  const dispatch = useDispatch()
  
  const loadCart = useCallback(async () => { 
    dispatch(getCart({page, userId: user?._id}))
  }, [dispatch, user, page])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  if (isLoading) {
    return <Loader></Loader>
  }

  if (user && goods.goods.length < 1) {
    return <h3>add goods to cart to see them here</h3>
  }
  
  return (
    <div className='cart'>   
      {
        user 
          ?
          (
            <div>
              <div className='cart__wraper'>
                {
                  goods.goods.map(good => (
                    <CartItem key={good._id} good={good} className='cart__wraper--item'></CartItem>
                  ))
                }

                <div className='cart__pursches'>
                  {
                    user.cart.cost
                  }
                  <br></br>
                  {
                    user.cart.amount
                  }
                </div>
              </div>

              {
                goods.pages > 1
                  ? (
                    <div className='cart__pagination'>
                      <div className='pagination'>
                        <Pagination currentPage={page} totalPages={goods.pages} setPage={setPage}></Pagination>
                      </div>
                    </div>
                  ) : ('')
              }
            </div>
          ) : 'Sign In to add goods to cart'
      }
    </div>
  )
}
