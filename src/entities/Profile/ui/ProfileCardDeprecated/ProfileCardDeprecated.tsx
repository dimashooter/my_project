import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Currency } from '@/entities/Currency/model/types/currency';
import { CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country/model/types/country';
import { CountrySelect } from '@/entities/Country';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import cls from './ProfileCardDeprecated.module.scss';
import { Profile } from '../../model/types/profile';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

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

export const ProfileCardDeprecatedSkeleton = () => {
  return (
    <Card max>
      <VStack gap='32' >
        <HStack gap='16'>
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
        </HStack>
        <HStack gap='16'>
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
          <Skeleton width="100%" height='38' />
        </HStack>
      </VStack>
    </Card>
  )
}

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
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
      <VStack
        max
        className={classNames(
          cls.ProfileCard,
          { [cls.loading]: true },
          [className],
        )}
      >
        <Loader />
      </VStack>
    );
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

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      max
      alignItems="start"
      gap="8"
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack max justifyContent="center">
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        data-testid='ProfilePage.firstname'
        value={data?.first}
        placeholder={t('Ваше имя') || ''}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <Input
        value={data?.lastname}
        placeholder={t('Ваша фамилия') || ''}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <Input
        value={data?.age}
        placeholder={t('Ваш возраст') || ''}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t('Город') || ' '}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t('Введите имя пользователя') || ''}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар') || ''}
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
  );
};
