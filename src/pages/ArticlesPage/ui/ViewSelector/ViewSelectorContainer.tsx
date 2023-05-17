import { memo } from 'react'
import { ArticleViewSelector } from '@/entities/Article';
import { useArticleFilters } from '../../lib';

interface ViewSelectorContainerProps {
  className?: string
}
export const ViewSelectorContainer = memo((props: ViewSelectorContainerProps) => {
  const { className } = props
  const { view, onChangeView } = useArticleFilters()
  return (
    <ArticleViewSelector view={view} onViewClick={onChangeView} className={className} />
  )
})
