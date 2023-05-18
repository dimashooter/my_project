import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SettingsPage.module.scss'
import { UiDesigneSwitcher } from '@/features/uiDesigneSwitcher/uiDesigneSwitcher'
import { Text } from '@/shared/ui/redesigned/Text/Text'
import { Page } from '@/widgets/Page/Page'

interface SettingsPageProps {
  className?: string
}
const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props

  const { t } = useTranslation();
  return (
    <Page className={classNames(cls.SettingsPage, {}, [className])}>
      <Text title={t('user_settigns')} />
      <UiDesigneSwitcher />
    </Page>
  )
})

export default SettingsPage