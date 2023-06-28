import React from 'react'
import cn from 'classnames'
import { MdArrowForwardIos, MdArrowBackIosNew  } from 'react-icons/md'
import './pagination.scss'

export default function Pagination({ currentPage, totalPages, setPage }) {
  let currentPageT = currentPage
  let totalPagesT = totalPages
  const delta = 1;
  const range = [];
  const pagination = [];

  if (currentPageT > totalPagesT) {
    currentPageT = 1
  }

  for (let i = Math.max(2, currentPageT - delta); i <= Math.min(totalPagesT - 1, currentPageT + delta); i++) {
    range.push(i);
  }

  pagination.push(1);
  if (range[0] > 2) {
    pagination.push('...');
  }
  pagination.push(...range);
  if (range[range.length - 1] < totalPagesT - 1) {
    pagination.push('...');
  }
  if (totalPagesT > 1) {
    pagination.push(totalPagesT);
  }

  return (
    <ul className="pagination">
      {currentPageT > 1 && (
        <li className='pagination__list'>
          <button onClick={() => setPage(curr => curr - 1)} className="pagination__button arrow">
            <MdArrowBackIosNew className='pagination__arrow2'></MdArrowBackIosNew>
          </button>
        </li>
      )}

      {pagination.map((page, index) => (
        <li key={index} className={cn('pagination__list', {'active': page === currentPageT})}>
          {page === '...' ? (
            <span className="pagination__ellipsis">...</span>
          ) : (
            <button className='pagination__button' onClick={() => setPage(page)}>{page}</button>
          )}
        </li>
      ))}

      {currentPageT < totalPagesT && (
        <li className='pagination__list'>
          <button onClick={() => setPage(curr => curr + 1)} className="pagination__button arrow">
            <MdArrowForwardIos></MdArrowForwardIos>
          </button>
        </li>
      )}
    </ul>
  )
}
