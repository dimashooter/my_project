import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import cls from './EditableProfileHeaderRedesigned.module.scss'
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';

interface EditableProfileCardHeaderProps {
    className?: string;
    avatar?: ReactNode
}

export const EditableProfileHeaderRedesigned = (
    props: EditableProfileCardHeaderProps,
) => {
    const { className, avatar } = props;

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
        <HStack
            max
            className={classNames(cls.EditableProfileCardHeader, {}, [
                className,
            ])}
        >
            <Text title={t('Профиль')} />
            <HStack max justifyContent="center" >
                {avatar !== null && avatar}
            </HStack>
            {canEdit && (
                <HStack gap='8' className={cls.btnsWrapper}>
                    {readonly ? (
                        <Button
                            className={cls.editBtn}
                            variant='filled'
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                className={cls.editBtn}
                                onClick={onCancelEdit}
                                variant='filled'
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                className={cls.saveBtn}
                                onClick={onSave}
                                variant='filled'
                            >
                                {t('Сохранить')}
                            </Button>
                        </>
                    )}
                </HStack>
            )}
        </HStack>
    );
};
