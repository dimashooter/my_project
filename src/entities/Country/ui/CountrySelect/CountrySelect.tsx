import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popup';
import { ListBox } from '@/shared/ui/redesigned/Popup';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(
    ({ className, value, onChange, readonly }: CountrySelectProps) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        return (
            <ToggleFeatures name='isAppRedesigned' on={
                <ListBox
                    direction="bottom right"
                    label={t('Укажите страну') || ''}
                    className={classNames('', {}, [className])}
                    value={value}
                    onChange={onChangeHandler}
                    items={options}
                    readonly={readonly}
                />}
                off={
                    <ListBoxDeprecated
                        direction="bottom left"
                        label={t('Укажите страну') || ''}
                        className={classNames('', {}, [className])}
                        value={value}
                        onChange={onChangeHandler}
                        items={options}
                        readonly={readonly}
                    />} />

        );
    },
);
