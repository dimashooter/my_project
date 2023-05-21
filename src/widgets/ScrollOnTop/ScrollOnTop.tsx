import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ScrollOnTop.module.scss'
import { ScrollButton } from '@/features/scrollButton/scrollButton'
import { VStack } from '@/shared/ui/redesigned/Stack'

interface ScrollOnTopProps {
  className?: string
}
export const ScrollOnTop = memo((props: ScrollOnTopProps) => {
  const { className } = props
  return (
    <VStack alignItems='center' justifyContent='center' className={classNames(cls.ScrollOnTop, {}, [className])}>
      <ScrollButton />
    </VStack>
  )
})
