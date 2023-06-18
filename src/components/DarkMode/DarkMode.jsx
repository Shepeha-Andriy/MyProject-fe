import React from 'react'
import { FaMoon, FaSun } from "react-icons/fa";
import './darkmode.scss'

export const checkTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  return savedTheme
}

export default function DarkMode() {
  checkTheme()

  const dark = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  const light = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }

  return (
    <div className='theme'>
      <div><FaSun className='theme__icon theme__icon--sun' onClick={light}></FaSun></div>
      <div><FaMoon className='theme__icon theme__icon--moon' onClick={dark}></FaMoon></div>
    </div>
  )
}
