import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/shared/ui/deprecated/ThemeSwitcher';
import { LangSwitcher } from '@/shared/ui/deprecated/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo/AppLogo';
import CollapseIcon from "../../../../shared/assets/icons/Arrow.svg";
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );



    return (
        <ToggleFeatures
            name='isAppRedesigned'
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.Sidebar_new, { [cls.collapsedRedesigned]: collapsed }, [
                        className,
                    ])}
                >
                    <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
                    <VStack gap="8" alignItems="start" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <Icon
                        size={16}
                        Svg={CollapseIcon}
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        clickable
                    />
                    <HStack justifyContent="center" gap='16' className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </HStack>
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                        className,
                    ])}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={cls.collapseBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                    <VStack gap="4" alignItems="start" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <HStack justifyContent="center" className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher short={collapsed} className={cls.lang} />
                    </HStack>
                </aside>
            }

        />


    );
});
