import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleSortSelector.module.scss'
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select'
import { ArticleOrder } from '@/shared/types'
import { ArticleSortType } from '@/entities/Article'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popup'
import { Text } from '@/shared/ui/redesigned/Text/Text'

interface ArticleSortSelectorProps {
  className?: string,
  onChangeOrder: (newOrder: ArticleOrder) => void;
  onChangeSort: (newSort: ArticleSortType) => void;
  sort: ArticleSortType,
  order: ArticleOrder
}
export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { t } = useTranslation()
  const { className, onChangeOrder, onChangeSort, order, sort } = props
  const orderOptions = useMemo<SelectOption<ArticleOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('asc'),
      },
      {
        value: 'desc',
        content: t('desc'),
      },
    ],
    [t],
  );

  const sortOptions = useMemo<SelectOption<ArticleSortType>[]>(
    () => [
      {
        value: ArticleSortType.CREATED_AT,
        content: t('by_date'),
      },
      {
        value: ArticleSortType.TITLE,
        content: t('by_title'),
      },
      {
        value: ArticleSortType.VIEW,
        content: t('by_view'),
      },
    ],
    [t],
  );
  return (
    <ToggleFeatures on={
      <VStack gap='8' alignItems='start' className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Text text={t('sort_by')} />
        <ListBox direction='bottom right'
          label={t('sort_by')}
          items={sortOptions}
          onChange={onChangeSort}
          value={sort}
        />
        <ListBox direction='bottom right'
          label={t('order_by')}
          items={orderOptions}
          onChange={onChangeOrder}
          value={order}
        />
      </VStack>
    } off={
      <HStack gap='16' className={classNames(cls.ArticleSortSelectorRedesign, {}, [className])}>
        <Select
          label={t('sort_by')}
          options={sortOptions}
          onChange={onChangeSort}
          value={sort}
        />
        <Select
          label={t('order_by')}
          options={orderOptions}
          onChange={onChangeOrder}
          value={order}
        />
      </HStack>
    } name='isAppRedesigned'

    />

  )
})
