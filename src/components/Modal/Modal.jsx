import React from 'react'
import './modal.scss'

export default function Modal({ active, setActive, children }) {
  return (
    <div className={active ? 'modal modal--active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content modal__content--active' : 'modal'} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
