import React, { useEffect, useState } from 'react'
import './navigation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import LengTogler from '../LengToggler/LengTogler';
import DarkMode from '../DarkMode/DarkMode';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
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
        <div className="dropdown__toggle"><FaUser size={'30px'}></FaUser> </div>
        {
          isOpen && (
            <ul className='dropdown__list'>
              <li className='dropdown__item'><DarkMode></DarkMode></li>
              <li className='dropdown__item'><LengTogler></LengTogler></li>
              {user && <li className='dropdown__item' onClick={handleLogout} style={{ textDecoration: 'none', cursor: 'pointer' }}>Logout</li>}
              {!user && <li className='dropdown__item' style={{ cursor: 'pointer'}} onClick={() => navigate('/signin')}>Login</li>}
            </ul>
          ) 
        }
      </div>
    </div>
  )
}
