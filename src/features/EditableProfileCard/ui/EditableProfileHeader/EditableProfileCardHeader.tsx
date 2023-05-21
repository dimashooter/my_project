import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import cls from './EditableProfileCardHeader.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = (
    props: EditableProfileCardHeaderProps,
) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (

        <ToggleFeatures
            name='isAppRedesigned'
            on={
                <Card padding='24' max border='semi'>

                    <HStack
                        max
                        className={classNames(cls.EditableProfileCardHeader, {}, [
                            className,
                        ])}
                    >
                        <Text title={t('Профиль')} />
                        {canEdit && (
                            <div className={cls.btnsWrapper}>
                                {readonly ? (
                                    <Button
                                        className={cls.editBtn}

                                        onClick={onEdit}
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            className={cls.editBtn}
                                            variant='outline_red'
                                            onClick={onCancelEdit}
                                        >
                                            {t('Отменить')}
                                        </Button>
                                        <Button
                                            className={cls.saveBtn}
                                            variant='outline_red' onClick={onSave}
                                        >
                                            {t('Сохранить')}
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </HStack>
                </Card>

            }
            off={
                <HStack
                    max
                    className={classNames(cls.EditableProfileCardHeader, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated title={t('Профиль')} />
                    {canEdit && (
                        <div className={cls.btnsWrapper}>
                            {readonly ? (
                                <ButtonDeprecated
                                    className={cls.editBtn}
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                >
                                    {t('Редактировать')}
                                </ButtonDeprecated>
                            ) : (
                                <>
                                    <ButtonDeprecated
                                        className={cls.editBtn}
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={onCancelEdit}
                                    >
                                        {t('Отменить')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        className={cls.saveBtn}
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onSave}
                                    >
                                        {t('Сохранить')}
                                    </ButtonDeprecated>
                                </>
                            )}
                        </div>
                    )}
                </HStack>
            }
        />

    );
};
