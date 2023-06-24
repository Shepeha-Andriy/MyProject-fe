import React, { useCallback, useEffect, useState } from 'react'
import './category.scss'
import GoodCard from '../../components/GoodCard/GoodCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAllGoods } from '../../redux/slices/goodSlice';
import { Loader } from '../../components/Loader/Loader'
import { useLocation, useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

export default function Category() {
  const type = useLocation().pathname.split('/')[2]
  // const [type, setType] = useState('phone')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const [sort, setSort] = useState('price')
  const { goods, isLoading } = useSelector(state => state.good)
  const dispatch = useDispatch()

  const pag = []

  useEffect(() => {
    dispatch(getAllGoods({ type, page, perPage }))
  }, [dispatch, type, sort, page, perPage])

  if (isLoading) {
    return <Loader></Loader>
  }

  for (let i = 1; i <= goods.pages; i++) {
    pag.push(i)
  }

  return (
    <div className='category'>
        <div className='category__wraper'>
          {
            goods.goods.map(good => (
              <div key={good._id} className='category__wraper--item'><GoodCard good={good}></GoodCard></div>
            ))
          }
        </div>

        <div className='category__pagination'>
          <div className='pagination'>
            <Pagination currentPage={page} totalPages={goods.pages} setPage={setPage}></Pagination>
          </div>
      </div>

    </div>
  )
}
