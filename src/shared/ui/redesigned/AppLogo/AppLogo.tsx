import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLogo.module.scss'
import { HStack } from '../Stack'
import Appicon from '@/shared/assets/icons/Avatar.svg'

interface AppLogoProps {
  className?: string
  size?: number
}
export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size = 30 } = props
  return (
    <HStack max justifyContent='center' className={classNames(cls.AppLogo, {}, [className])}>
      <Appicon width={size} height={size} color='black' className={cls.logo} />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  )
})
