import React from 'react'
import Navigation from '../Navigation/Navigation'
import { FaHome } from "react-icons/fa";
import './header.scss'

export default function Header() {
  return (
    <div className='header'>
      <div>
        <FaHome size={'30px'} style={{cursor: 'pointer'}}></FaHome>
      </div>

      <Navigation></Navigation>
    </div>
  )
}
