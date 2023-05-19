import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { Page } from '@/widgets/Page/Page'

interface ArticleEditPageProps {
  className?: string
}
export const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props
  const { id } = useParams()
  return (
    <Page className={className}>
      Article with id: {id}
    </Page>
  )
})
