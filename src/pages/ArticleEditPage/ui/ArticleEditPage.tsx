import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/Page'
import { Text } from '@/shared/ui/redesigned/Text/Text'

interface ArticleEditPageProps {
  className?: string
}
export const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props
  const { id } = useParams()
  const { t } = useTranslation()
  return (
    <Page className={className}>
      <Text text={`${t('article_id')} ${id}`} />
    </Page>
  )
})
