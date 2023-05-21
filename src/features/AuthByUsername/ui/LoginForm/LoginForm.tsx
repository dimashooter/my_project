import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PasswordInput as PasswordInputDeprecated } from '@/shared/ui/deprecated/PasswordInput/PasswordInput';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { PasswordInput } from '@/shared/ui/redesigned/PasswordInput/PasswordInput';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate()
        }
    }, [onSuccess, dispatch, password, username, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <ToggleFeatures
                name='isAppRedesigned'
                on={

                    <VStack gap='24' max>
                        <Text title={t('Форма авторизации')} bold />
                        {error && (
                            <Text
                                text={t('Вы ввели неверный логин или пароль')}
                                TextVariant='error'
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            placeholder={t('Введите username') || ''}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <PasswordInput
                            placeholder={t('Введите пароль') || ''}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <Button
                            variant='outline'
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('Форма авторизации')} />
                        {error && (
                            <TextDeprecated
                                text={t('Вы ввели неверный логин или пароль')}
                                theme={TextTheme.ERROR}
                            />
                        )}
                        <InputDeprecated
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите username') || ''}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <PasswordInputDeprecated
                            className={cls.input}
                            placeholder={t('Введите пароль') || ''}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </div>
                }


            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
