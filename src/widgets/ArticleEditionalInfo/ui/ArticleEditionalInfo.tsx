import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text/Text'
import { User } from '@/entities/User'
import { Button } from '@/shared/ui/redesigned/Button/Button'

interface ArticleEditionalInfoProps {
  className?: string
  author: User,
  createdAt: string,
  views: number,
  onEdit: () => void
}
export const ArticleEditionalInfo = memo((props: ArticleEditionalInfoProps) => {
  const { className, author, createdAt, views, onEdit } = props
  const { t } = useTranslation()
  return (
    <div className={className}>
      <VStack gap='16'>

        <HStack gap='4'>
          <Avatar src={author.avatar} size={32} />
          <Text text={author.username} bold />
          <Text text={createdAt} />
        </HStack>
        <Button onClick={onEdit}>{t('Редактировать')})</Button>
        <Text text={t('{{count}} views', { count: views })} />
      </VStack>
    </div>
  )
})
