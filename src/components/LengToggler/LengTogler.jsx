import React from 'react'
import { useTranslation } from 'react-i18next';
import './lengtoggler.scss'

export default function LengTogler() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const len = localStorage.getItem('i18nextLng')

  return (
    <div>
      <div className='leng'>
        <div className='leng__flag'>
          <img className={len === 'ua' ? 'leng__selected' : ''} src='../../assets/images/ua.jpg' alt='img' style={{ width: '20px' }} onClick={() => changeLanguage('ua')}></img>
        </div>
        
        <div className='leng__flag'>
          <img className={len === 'en' ? 'leng__selected' : ''} src='../../assets/images/en.jpg' alt='img' style={{width: '20px'}} onClick={() => changeLanguage('en')}></img>
        </div>
      </div>
    </div>
  )
}
