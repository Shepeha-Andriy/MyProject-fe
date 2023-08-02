import React, { useEffect, useState } from 'react'
import './navigation.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import DropDown from './DropDown';
import Notification from './Notification';
import Menu from './Menu';

export default function Navigation() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isP, setIsP] = useState(false)
  const { t } = useTranslation();
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsP(true);
    }

    const handleResize = () => {
      if (window.innerWidth < 480) {
        setIsP(true);
      } else {
        setIsP(false)
        setIsOpenMenu(false)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  if (isOpenMenu) {
    return <Menu setIsOpenMenu={setIsOpenMenu}></Menu>
  }

  return (
    <div className='navigation'>
      {
        !isP
          ?
            (<ul className='navigation__list'>
              <li className='navigation__item'></li>
              <li className='navigation__item'><Notification></Notification></li>
              <li className='navigation__item'><FaShoppingCart size={'30px'} onClick={() => navigate('/cart')} style={{cursor: 'pointer'}}></FaShoppingCart></li>
              <li className='navigation__item'><DropDown></DropDown></li>
            </ul>)
          : <div className='menu__open' onClick={() => setIsOpenMenu(true)}><HiOutlineMenu size={'30px'}></HiOutlineMenu></div>
      }
    </div>
  )
}
