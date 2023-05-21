import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '../Button/Button';
import cls from './LangSwitcher.module.scss'
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '../../redesigned/Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}


export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            name='isAppRedesigned'
            on={
                <Button
                    variant='clear'
                    onClick={toggle}
                >
                    {short ? t('short_language') : t('lang')}
                </Button>
            }
            off={<ButtonDeprecated
                className={classNames(cls.LangSwitcher, {}, [className])}
                theme={ButtonTheme.CLEAR}
                onClick={toggle}
            >
                {t(short ? 'Короткий язык' : 'Язык')}
            </ButtonDeprecated>}
        />

    );
});
