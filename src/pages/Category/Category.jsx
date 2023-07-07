import React, { useCallback, useEffect, useState } from 'react'
import './category.scss'
import GoodCard from '../../components/GoodCard/GoodCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoods } from '../../redux/slices/goodSlice';
import { Loader } from '../../components/Loader/Loader'
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { getCart } from '../../redux/slices/cartSlice';

export default function Category() {
  const type = useLocation().pathname.split('/')[2]
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const [sort, setSort] = useState('price')
  const { user } = useSelector(state => state.user)
  const { goods, isLoading } = useSelector(state => state.good)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllGoods({ type, page, perPage }))
    
    if (user) {
      dispatch(getCart({ userId: user?._id }))
    }
  }, [dispatch, type, sort, page, perPage])

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className='category'>
      <div className='category__wraper'>
        {
          goods?.goods?.map(good => (
            <div key={good._id} className='category__wraper--item'><GoodCard good={good}></GoodCard></div>
          ))
        }
      </div>

      {
        goods.pages > 1
          ? (
            <div className='category__pagination'>
              <div className='pagination'>
                <Pagination currentPage={page} totalPages={goods.pages} setPage={setPage}></Pagination>
              </div>
            </div>
          ) : ('')
      }
    </div>
  )
}
