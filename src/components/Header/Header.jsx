import React from 'react'
import { checkTheme } from '../DarkMode/DarkMode'
import Navigation from '../Navigation/Navigation'
import { FaHome } from "react-icons/fa";
import './header.scss'

export default function Header() {

  checkTheme()

  return (
    <div className='header'>
      <div className='header__logo'>
        <FaHome size={'30px'} style={{cursor: 'pointer', marginLeft: '35px'}}></FaHome>
      </div>

      <Navigation></Navigation>
    </div>
  )
}
