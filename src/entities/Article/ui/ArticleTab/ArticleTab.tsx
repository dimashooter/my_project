import { memo, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';

interface ArticleTabProps {
className?: string
onTabClick: (value:TabItem) => void
type: ArticleType
}
export const ArticleTab = memo((props:ArticleTabProps) => {
    const { className, onTabClick, type } = props;

    const tabs = useMemo<TabItem[]>(() => [
        { value: ArticleType.IT, content: 'IT' },
        { value: ArticleType.ECONOMICS, content: 'Economics' },
        { value: ArticleType.SCIENCE, content: 'Science' },
        { value: ArticleType.ALL, content: 'ALL' },
    ], []);
    return (
        <Tabs value={type} tabs={tabs} onTabClick={onTabClick} />
    );
});
