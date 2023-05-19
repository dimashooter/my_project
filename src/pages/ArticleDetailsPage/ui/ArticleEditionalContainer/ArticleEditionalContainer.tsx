import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/redesigned/Card/Card'
import { ArticleEditionalInfo } from '@/widgets/ArticleEditionalInfo'
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails'
import { getRouteArticleEdit } from '@/shared/config/routeConfig/routeConfig'

interface ArticleEditionalContainerProps {
  className?: string
}
export const ArticleEditionalContainer = memo((props: ArticleEditionalContainerProps) => {
  const { className } = props

  const data = useSelector(getArticleDetailsData)
  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (data) {
      navigate(getRouteArticleEdit(data.id))
    }
  }, [data, navigate])
  if (!data) {
    return null
  }

  return (
    <div className={className}>
      <Card padding='24' className={className} border='semi'>
        <ArticleEditionalInfo onEdit={onEditArticle} author={data.user} createdAt={data.createdAt}
          views={data.views} />
      </Card >
    </div >
  )
})
