import React, { useEffect, useState } from 'react'
import './navigation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='navigation'>
      Navigation

      <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button className="dropdown-toggle">Dropdown</button>
        {
          user ? (
            isOpen && (
              <ul className='dropdown__list'>
                <li className='dropdown__item'>Пункт 1</li>
                <li className='dropdown__item'>Пункт 2</li>
                <li className='dropdown__item' onClick={handleLogout}>Logout</li>
              </ul>
            ) 
          ) : (
            isOpen && (
              <ul className='dropdown__list'>
                <li className='dropdown__item'>Пункт 1</li>
                <li className='dropdown__item'>Пункт 2</li>
                <li className='dropdown__item'> <Link to={'/signin'} style={{textDecoration: 'none', color: 'green'}}>Login</Link></li>
              </ul>
            )
          )
        }
      </div>
    </div>
  )
}
