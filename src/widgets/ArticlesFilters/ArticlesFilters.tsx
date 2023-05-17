import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesFilters.module.scss'
import { Card } from '@/shared/ui/redesigned/Card/Card'
import { ArticleSortType, ArticleTab, ArticleType } from '@/entities/Article'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input'
import { ArticleOrder } from '@/shared/types'
import { ArticleSortSelector } from '@/features/ArticleSortSelector/ArticleSortSelector'
import { ToggleFeatures } from '@/shared/lib/features'
import { Input } from '@/shared/ui/redesigned/Input/Input'
import SearchIcon from '@/shared/assets/icons/searchIcon.svg'
import { Icon } from '@/shared/ui/redesigned/Icon/Icon'


interface ArticlesFiltersProps {
  className?: string
  sort: ArticleSortType,
  order: ArticleOrder
  type: ArticleType
  search: string
  onChangeType: (type: ArticleType) => void;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: ArticleOrder) => void;
  onChangeSort: (newSort: ArticleSortType) => void;
}
export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const { className, onChangeOrder,
    onChangeSearch, onChangeSort, onChangeType, order, search, sort, type } = props
  const { t } = useTranslation();
  return (
    <Card padding='24' className={classNames(cls.ArticlesFilters, {}, [className])}>
      <ToggleFeatures
        on={<Input
          addonLeft={<Icon size={32} Svg={SearchIcon} />}
          placeholder={t('search') || ''}
          onChange={onChangeSearch}
          value={search}
        />}
        off={<InputDeprecated
          placeholder={t('search') || ''}
          onChange={onChangeSearch}
          value={search}
        />}
        name='isAppRedesigned'
      />

      <ArticleTab onChangeType={onChangeType} type={type} />
      <ArticleSortSelector
        onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} order={order}
        sort={sort} />
    </Card>
  )
})
