import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
  value:string;
  content: ReactNode
}

interface TabsProps {
className?: string
tabs: TabItem[]
value: string
onTabClick: (value:TabItem) => void
}
export const Tabs = memo((props:TabsProps) => {
    const {
        className, onTabClick, tabs, value,
    } = props;
    const onTabHandler = (tab:TabItem) => () => {
        onTabClick(tab);
    };
    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {
                tabs.map((tab) => (
                    <Card
                        className={cls.tab_card}
                        theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                        key={tab.value}
                        onClick={onTabHandler(tab)}
                    >
                        {tab.content}
                    </Card>
                ))
            }
        </div>
    );
});
