import { memo } from 'react'
import cls from './AppLoaderLayout.module.scss'
import { MainLayout } from '../MainLayouts'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton'

interface AppLoaderLayoutProps {
  className?: string
}
export const AppLoaderLayout = memo((props: AppLoaderLayoutProps) => {
  const { className } = props
  return (
    <MainLayout

      header={
        <HStack className={cls.header}>
          <Skeleton width={40} height={40} border='50%' />
        </HStack>
      }
      content={
        <VStack gap='16' className={cls.content} alignItems='start' >
          <Skeleton width='70%' height={32} border='16px' />
          <Skeleton width='40%' height={20} border='16px' />
          <Skeleton width='50%' height={20} border='16px' />
          <Skeleton width='30%' height={32} border='16px' />
          <Skeleton width='80%' height="40%" border='16px' />
          <Skeleton width='80%' height="40%" border='16px' />
        </VStack>
      }
      sidebar={
        <Skeleton border="32px" width={220} height="100%" />
      }
    />
  )
})
