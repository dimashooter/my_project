import { ReactElement, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainLayouts.module.scss'

interface MainLayoutsProps {
  className?: string
  Header: ReactElement
  Sidebar: ReactElement
  Content: ReactElement
  Toolbar?: ReactElement
}
export const MainLayouts = memo((props: MainLayoutsProps) => {
  const { className, Content, Sidebar, Toolbar, Header } = props
  return (
    <div className={classNames(cls.MainLayouts, {}, [className])}>
      <div className={cls.sidebar} >{Sidebar}</div>
      <div className={cls.Content} >{Content}</div>
      <div className={cls.rightbar} >
        <div className={cls.Header} >{Header}</div>
        <div className={cls.Content} >{Toolbar}</div>
      </div>
    </div>
  )
})
