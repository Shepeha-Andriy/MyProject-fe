import React from 'react'

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
    <div>
      <div onClick={dark} style={{color: 'green'}}>dark</div>
      <div onClick={light} style={{color: 'green'}}>light</div>
    </div>
  )
}
