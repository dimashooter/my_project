import { ReactElement, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StickyLayout.module.scss'

interface StickyLayoutProps {
  className?: string
  left?: ReactElement
  content: ReactElement
  right?: ReactElement
}
export const StickyLayout = memo((props: StickyLayoutProps) => {
  const { className, left, content, right } = props
  return (
    <div className={classNames(cls.StickyLayout, {}, [className])}>
      {left && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {right && <div className={cls.right}>{right}</div>}
    </div>
  )
})
