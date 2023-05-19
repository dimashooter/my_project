import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text/Text';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { detectDevice } from '@/shared/lib/helpers/detectDevice';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';

interface RatingCardProps {
    className?: string;
    title?: string | null;
    feedbackTitle?: string | null;
    hasFeedback?: boolean;
    onCancel?: (startsCount: number) => void;
    onAccept?: (startsCount: number, feedBack?: string) => void;
    rate?: number;
}
export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        onCancel,
        hasFeedback,
        onAccept,
        rate = 0,
    } = props;

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            name='isAppRedesigned'
            off={
                <VStack gap="32">
                    <TextDeprecated title={feedbackTitle} align={TextAlign.CENTER} />
                    <InputDeprecated
                        placeholder={t('Добавить комментарий') || ''}
                        value={feedback}
                        onChange={setFeedback}
                        data-testid="Rating.Input"
                    />
                </VStack>
            }
            on={
                <VStack gap="32">
                    <Text title={feedbackTitle} align="center" />
                    <Input
                        placeholder={t('Добавить комментарий') || ''}
                        value={feedback}
                        onChange={setFeedback}
                        data-testid="Rating.Input"
                    />
                </VStack>
            }
        />

    );

    return (
        <ToggleFeatures
            on={
                <Card border='semi' max className={classNames(cls.RatingCard, {}, [className])}
                    data-testid='RatingCard'>
                    <VStack max gap="16" alignItems="center">
                        <Text title={starsCount ? t('Спасибо за оценку!') : title} />
                        <StarRating
                            onSelect={onSelectStars}
                            selectedStar={starsCount}
                        />
                        {detectDevice() ? (
                            <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                                {modalContent}
                                <HStack
                                    max
                                    gap="16"
                                    justifyContent="between"
                                    className={cls.marginTop}
                                >
                                    <Button
                                        fullWidth
                                        onClick={acceptHandle}
                                    >
                                        {t('add')}
                                    </Button>
                                </HStack>
                            </Drawer>
                        ) : (
                            <Modal isOpen={isModalOpen} onClose={cancelHandle}>
                                {modalContent}
                                <HStack max gap="16" justifyContent="between">
                                    <Button
                                        fullWidth
                                        onClick={cancelHandle}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <Button fullWidth onClick={acceptHandle}
                                        data-testid='Rating.Button'
                                    >{t('add')}</Button>
                                </HStack>
                            </Modal>
                        )}
                    </VStack>
                </Card>
            }
            off={
                <CardDeprecated max className={classNames(cls.RatingCard, {}, [className])} data-testid='RatingCard'>
                    <VStack max gap="16" alignItems="center">
                        <TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title} />
                        <StarRating
                            onSelect={onSelectStars}
                            selectedStar={starsCount}
                        />
                        {detectDevice() ? (
                            <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                                {modalContent}
                                <HStack
                                    max
                                    gap="16"
                                    justifyContent="end"
                                    className={cls.marginTop}
                                >
                                    <ButtonDeprecated
                                        theme={ButtonTheme.BACKGROUND_INVERTED}
                                        fullWidth
                                        onClick={acceptHandle}
                                    >
                                        {t('add')}
                                    </ButtonDeprecated>
                                </HStack>
                            </Drawer>
                        ) : (
                            <Modal isOpen={isModalOpen} onClose={cancelHandle}>
                                {modalContent}
                                <HStack max gap="16" justifyContent="end">
                                    <ButtonDeprecated
                                        onClick={cancelHandle}
                                        theme={ButtonTheme.OUTLINE_RED}

                                    >
                                        {t('cancel')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated onClick={acceptHandle}
                                        data-testid='Rating.Button'
                                    >{t('add')}</ButtonDeprecated>
                                </HStack>
                            </Modal>
                        )}
                    </VStack>
                </CardDeprecated>
            }
            name='isAppRedesigned'
        />
    );
});
