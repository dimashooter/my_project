import { memo } from 'react'
import { Icon } from '@/shared/ui/redesigned/Icon/Icon'
import ScrollIcon from '@/shared/assets/icons/ScrollTopIcon.svg'

interface ScrollButtonProps {
  className?: string
}
export const ScrollButton = memo((props: ScrollButtonProps) => {
  const { className } = props


  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Icon width={32} height={32} clickable
      onClick={handleClick} Svg={ScrollIcon}
      className={className} />
  )
})
