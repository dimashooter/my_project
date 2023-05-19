import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Card } from '@/shared/ui/redesigned/Card/Card'
import { ArticleEditionalInfo } from '@/widgets/ArticleEditionalInfo'
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails'

interface ArticleEditionalContainerProps {
  className?: string
}
export const ArticleEditionalContainer = memo((props: ArticleEditionalContainerProps) => {
  const { className } = props

  const data = useSelector(getArticleDetailsData)

  if (!data) {
    return null
  }
  console.log(data.user);

  return (
    <div className={className}>
      <Card padding='24' className={className}>
        <ArticleEditionalInfo author={data.user} createdAt={data.createdAt} views={data.views} />
      </Card >
    </div >
  )
})
