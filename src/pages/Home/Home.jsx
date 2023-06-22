import React from 'react'
import { useTranslation } from 'react-i18next';
import { checkTheme } from '../../components/DarkMode/DarkMode'
import Categories from './Categories';
import Promotions from './Promotions';

export default function Home() {
  const { t } = useTranslation();

  checkTheme()

  return (
    <div className='home'>
      {t('sign_in')}
      <Categories></Categories>
      <Promotions></Promotions>
    </div>
  )
}
