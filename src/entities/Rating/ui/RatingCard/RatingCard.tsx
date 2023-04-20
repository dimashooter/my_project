import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Text, TextAlign } from '@/shared/ui/Text/Text';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { detectDevice } from '@/shared/lib/helpers/detectDevice';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Card } from '@/shared/ui/Card/Card';

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (startsCount: number) => void
    onAccept?: (startsCount: number, feedBack?: string) => void
    rate?: number
}
export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className, title, feedbackTitle, onCancel, hasFeedback, onAccept, rate = 0,
    } = props;

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <VStack gap="32">
            <Text title={feedbackTitle} align={TextAlign.CENTER} />
            <Input placeholder={t('Добавить комментарий')} value={feedback} onChange={setFeedback} />
        </VStack>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack max gap="16" alignItems="center">
                <Text title={starsCount ? t('Спасибо за оценку!') : title} />
                <StarRating onSelect={onSelectStars} selectedStar={starsCount} />
                {
                    detectDevice()
                        ? (
                            <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                                {modalContent}
                                <HStack max gap="16" justifyContent="end" className={cls.marginTop}>
                                    <Button
                                        theme={ButtonTheme.BACKGROUND_INVERTED}
                                        fullWidth
                                        onClick={acceptHandle}
                                    >
                                        {t('add')}

                                    </Button>
                                </HStack>
                            </Drawer>
                        )
                        : (
                            <Modal isOpen={isModalOpen} onClose={cancelHandle}>
                                {modalContent}
                                <HStack max gap="16" justifyContent="end">
                                    <Button
                                        onClick={cancelHandle}
                                        theme={ButtonTheme.OUTLINE_RED}
                                    >
                                        {t('cancel')}

                                    </Button>
                                    <Button onClick={acceptHandle}>{t('add')}</Button>
                                </HStack>
                            </Modal>
                        )
                }

            </VStack>
        </Card>
    );
});