import React from 'react'
import { useTranslation } from 'react-i18next';
import { checkTheme } from '../../components/DarkMode/DarkMode'

export default function Home() {
  const { t } = useTranslation();

  checkTheme()

  return (
    <div>
      {t('sign_in')}
    </div>
  )
}
