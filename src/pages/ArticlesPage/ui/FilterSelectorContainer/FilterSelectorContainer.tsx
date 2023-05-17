import { memo } from 'react'
import { ArticlesFilters } from '@/widgets/ArticlesFilters/ArticlesFilters'
import { useArticleFilters } from '../../lib'

interface FilterSelectorContainerProps {
  className?: string
}
export const FilterSelectorContainer = memo((props: FilterSelectorContainerProps) => {
  const { className } = props
  const { onChangeOrder, onChangeSearch, onChangeSort, onChangeType, order, search, sort, type, } = useArticleFilters()

  return (
    <ArticlesFilters onChangeOrder={onChangeOrder} onChangeSearch={onChangeSearch} onChangeSort={onChangeSort}
      onChangeType={onChangeType} order={order}
      search={search} sort={sort} type={type}
      className={className}
    />
  )
})
