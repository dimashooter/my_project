import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { Flex } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}
type TabDirection = 'column' | 'row'

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (value: TabItem) => void;
    direction?: TabDirection
}

export const Tabs = memo((props: TabsProps) => {
    const { className, onTabClick, tabs, value, direction = 'column' } = props;
    const onTabHandler = (tab: TabItem) => () => {
        onTabClick(tab);
    };
    return (
        <Flex alignItems='start' gap='8' direction={direction}
            className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab_card}
                    variant={
                        tab.value === value
                            ? 'light'
                            : 'normal'
                    }
                    key={tab.value}
                    onClick={onTabHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    );
});
