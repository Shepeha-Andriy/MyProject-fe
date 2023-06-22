import React from 'react'
import { checkTheme } from '../DarkMode/DarkMode'
import Navigation from '../Navigation/Navigation'
import { FaHome } from "react-icons/fa";
import './header.scss'
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate()

  checkTheme()

  return (
    <div className='header'>
      <div className='header__logo'>
        <FaHome size={'30px'} style={{cursor: 'pointer', marginLeft: '35px'}} onClick={() => navigate('/')}></FaHome>
      </div>

      <Navigation></Navigation>
    </div>
  )
}
