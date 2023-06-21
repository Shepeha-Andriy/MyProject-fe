import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { AiOutlineClose } from "react-icons/ai";
import LangTogler from '../LangToggler/LangTogler';
import DarkMode from '../DarkMode/DarkMode';
import './navigation.scss'

export default function Menu({ setIsOpenMenu }) {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
  }


  return (
    <div className='menu'>
      <ul className='menu__list'>
        <li className='menu__item' onClick={() => setIsOpenMenu(false)}><AiOutlineClose size={'30px'}></AiOutlineClose></li>
        <li className='menu__item'><DarkMode></DarkMode></li>
        <li className='menu__item'><LangTogler></LangTogler></li>
        {user && <li className='menu__item' onClick={handleLogout} style={{ textDecoration: 'none', cursor: 'pointer' }}>Logout</li>}
        {!user && <li className='menu__item' style={{ cursor: 'pointer'}} onClick={() => navigate('/signin')}>Login</li>}
      </ul>
    </div>
  )
}
