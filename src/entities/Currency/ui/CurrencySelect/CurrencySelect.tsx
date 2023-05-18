import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/redesigned/Popup';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popup';
import { Currency } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
    ({ className, value, onChange, readonly }: CurrencySelectProps) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <ToggleFeatures
                name='isAppRedesigned'
                on={
                    <ListBox
                        direction="top left"
                        label={t('валюта') || ''}
                        className={classNames('', {}, [className])}
                        value={value}
                        onChange={onChangeHandler}
                        items={options}
                        readonly={readonly}
                    />
                }
                off={
                    <ListBoxDeprecated
                        label={t('Страна') || ''}
                        className={classNames('', {}, [className])}
                        value={value}
                        onChange={onChangeHandler}
                        items={options}
                        readonly={readonly}
                    />
                }
            />

        );
    },
);
