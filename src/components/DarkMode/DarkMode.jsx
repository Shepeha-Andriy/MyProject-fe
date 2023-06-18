import React from 'react'

export default function DarkMode() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

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
