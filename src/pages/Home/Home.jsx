import React from 'react'
import { useTranslation } from 'react-i18next';
import { checkTheme } from '../../components/DarkMode/DarkMode'
import Categories from './Categories';
import Promotions from './Promotions';
import Animations from '../../components/Animations/Animations';

export default function Home() {
  const { t } = useTranslation();
  checkTheme()

  return (
    <div className='home'>
      {t('sign_in')}
      <Categories></Categories>
      <Promotions></Promotions>

      <Animations></Animations>
    </div>
  )
}
