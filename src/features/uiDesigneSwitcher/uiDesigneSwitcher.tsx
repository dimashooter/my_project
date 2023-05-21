import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popup'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text/Text'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton'

interface UiDesigneSwitcherProps {
  className?: string
}
export const UiDesigneSwitcher = memo((props: UiDesigneSwitcherProps) => {
  const { className } = props

  const isAppRedesigne = getFeatureFlag('isAppRedesigned');
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const authData = useSelector(getUserAuthData)
  const [isLoading, setIsLoading] = useState(false)
  const items = [
    { content: t('new'), value: 'new' },
    { content: t('old'), value: 'old' },
  ]
  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true)
      await dispatch(updateFeatureFlag({
        userId: authData.id,
        features: {
          isAppRedesigned: value === 'new'
        },
      })).unwrap()
    }
    setIsLoading(false)
  }


  return (
    <HStack gap='16'>
      <Text text={t('Variant_interface')} />
      {
        isLoading ? < Skeleton height={40} width={100} /> : <ListBox direction='bottom left' items={items}
          value={isAppRedesigne ? 'new' : 'old'}
          onChange={onChange} />
      }

    </HStack>
  )
})
