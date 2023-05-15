import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/shared/ui/deprecated/Modal/Modal'
import { Text, TextAlign } from '@/shared/ui/deprecated/Text/Text'
import { saveJsonSettings, useJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'


export const ArticlePageGreeting = memo(() => {

  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageWasOpened } = useJsonSettings()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()



  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen]);

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true)
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }))
    }
  }, [isArticlePageWasOpened, dispatch])

  return (
    <Modal lazy isOpen={isOpen} onClose={closeModal}
    >
      <Text align={TextAlign.CENTER} title={t('greeting')} text={t('text_greeting')} />
    </Modal>
  )
})
