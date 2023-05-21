import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency } from '@/entities/Currency/model/types/currency';
import { CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country/model/types/country';
import { CountrySelect } from '@/entities/Country';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import cls from './ProfileCardRedesigne.module.scss';
import { Profile } from '../../model/types/profile';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { EditableProfileHeaderRedesigned } from
  '@/features/EditableProfileCard/ui/EditableProfileHeaderRedesigned/EditableProfileHeaderRedesigned';

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

export const ProfileCardRedesigneSkeleton = () => {
  return (
    <Card padding='24' max>
      <VStack gap='32'>
        <HStack max justifyContent='center'>
          <Skeleton border='100%' width={120} height={120}
            className={cls.ProfileAvatar} />
        </HStack>
      </VStack>
      <HStack max gap='32' >
        <VStack max gap='16'>
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
        </VStack>
        <VStack max gap='16'>
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
        </VStack>
      </HStack>
    </Card>
  )
}

export const ProfileCardRedesigne = (props: ProfileCardProps) => {
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
  if (isLoading) {
    return (
      <ProfileCardRedesigneSkeleton />
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
          TextVariant='error'
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align='center'
        />
      </VStack>
    );
  }


  return (
    <Card
      variant='light'
      max
      padding='24'
      className={classNames(cls.ProfileCardRedesigne, {}, [className])}
    >
      <EditableProfileHeaderRedesigned avatar={<Avatar className={cls.ProfileAvatar} size={120}
        src={data?.avatar} />} />


      <HStack gap='24' max>

        <VStack max gap='16'>

          <Input
            data-testid='ProfilePage.firstname'
            value={data?.first}
            label={t('имя') || ''}
            className={cls.input}
            onChange={onChangeFirstname}
            readonly={readonly}
          />
          <Input
            value={data?.lastname}
            label={t('фамилия') || ''}
            className={cls.input}
            onChange={onChangeLastname}
            readonly={readonly}
          />
          <Input
            value={data?.age}
            label={t('возраст') || ''}
            className={cls.input}
            onChange={onChangeAge}
            readonly={readonly}
          />
          <Input
            value={data?.city}
            label={t('Город') || ' '}
            className={cls.input}
            onChange={onChangeCity}
            readonly={readonly}
          />
        </VStack>
        <VStack max gap='16'>
          <Input
            value={data?.username}
            label={t('имя пользователя') || ''}
            className={cls.input}
            onChange={onChangeUsername}
            readonly={readonly}
          />
          <Input
            value={data?.avatar}
            label={t('ссылку на аватар') || ''}
            className={cls.input}
            onChange={onChangeAvatar}
            readonly={readonly}
          />
          <CurrencySelect
            className={cls.input}
            value={data?.currency}
            onChange={onChangeCurrency}
            readonly={readonly}
          />
          <CountrySelect
            className={cls.input}
            value={data?.country}
            onChange={onChangeCountry}
            readonly={readonly}
          />
        </VStack>
      </HStack>

    </Card>
  );
};
