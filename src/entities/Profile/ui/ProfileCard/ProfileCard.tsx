import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Currency } from '@/entities/Currency/model/types/currency';
import { Country } from '@/entities/Country/model/types/country';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { ToggleFeatures } from '@/shared/lib/features';
import { ProfileCardDeprecated, ProfileCardDeprecatedSkeleton } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesigne, ProfileCardRedesigneSkeleton } from '../ProfileCardRedesigne/ProfileCardRedesigne';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');

    const properties = {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    }

    if (isLoading) {
        return (
            <ToggleFeatures
                name='isAppRedesigned'
                off={<ProfileCardDeprecatedSkeleton />}
                on={< ProfileCardRedesigneSkeleton />}
            />
        )
    }

    if (error) {
        return (
            <VStack
                max
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </VStack>
        );
    }



    return (
        <ToggleFeatures name='isAppRedesigned' off={<ProfileCardDeprecated {...properties} />}
            on={<ProfileCardRedesigne {...properties} />} />
    )
};
