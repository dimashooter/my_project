import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button as ButtonDeprecated, ButtonTheme } from '../../Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon as IconDeprecated } from '../../Icon/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import ThemeIcon from "@/shared/assets/icons/themeIcon.svg"

interface ThemeSwitcherProps {
    className?: string;
}


export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch()
    const toggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }))
        })
    }, [dispatch, toggleTheme])
    return (
        <ToggleFeatures
            name='isAppRedesigned'
            on={
                <Button
                    variant='clear'
                >
                    <Icon Svg={ThemeIcon} width="2em" height="2em"
                        onClick={toggleHandler} clickable
                    />
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    className={classNames('', {}, [className])}
                    onClick={toggleHandler}
                >
                    {theme === Theme.DARK ? <IconDeprecated Svg={DarkIcon} width="2em" height="2em"
                        inverted /> : <IconDeprecated Svg={LightIcon}
                            width="2em" height="2em" inverted
                    />}
                </ButtonDeprecated>
            }

        />
    );
});
