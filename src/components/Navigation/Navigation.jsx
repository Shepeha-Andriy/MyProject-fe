import React, { useEffect, useState } from 'react'
import './navigation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

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

      <div className='leng'>
        <div className='leng__flag'>
          <img src='../../assets/images/ua.jpg' alt='img' style={{ width: '20px' }} onClick={() => changeLanguage('ua')}></img>
        </div>
        
        <div className='leng__flag'>
            <img src='../../assets/images/en.jpg' alt='img' style={{width: '20px'}} onClick={() => changeLanguage('en')}></img>
        </div>
      </div>

      <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="dropdown__toggle"><FaUser size={'30px'}></FaUser> </div>
        {
          user ? (
            isOpen && (
              <ul className='dropdown__list'>
                <li className='dropdown__item'>Пункт 1</li>
                <li className='dropdown__item'>Пункт 2</li>
                <li className='dropdown__item' onClick={handleLogout} style={{ textDecoration: 'none', color: 'green', cursor: 'pointer'}}>Logout</li>
              </ul>
            ) 
          ) : (
            isOpen && (
              <ul className='dropdown__list'>
                <li className='dropdown__item'>Пункт 1</li>
                <li className='dropdown__item'>Пункт 2</li>
                  <li className='dropdown__item'> <Link to={'/signin'} style={{ textDecoration: 'none', color: 'green', cursor: 'pointer'}}>Login</Link></li>
              </ul>
            )
          )
        }
      </div>
    </div>
  )
}
