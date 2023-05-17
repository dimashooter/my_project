import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs as TabDeprecated } from '@/shared/ui/deprecated/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs/Tabs';

interface ArticleTabProps {
    className?: string;
    onChangeType: (type: ArticleType) => void;

    type: ArticleType;
}
export const ArticleTab = memo((props: ArticleTabProps) => {
    const { className, onChangeType, type } = props;
    const { t } = useTranslation('')

    const tabs = useMemo<TabItem[]>(
        () => [
            { value: ArticleType.ALL, content: t('All') },
            { value: ArticleType.IT, content: 'IT' },
            { value: ArticleType.ECONOMICS, content: t('Economics') },
            { value: ArticleType.SCIENCE, content: t('Science') },
        ],
        [t],
    );
    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );
    return (
        <ToggleFeatures
            on={<Tabs value={type} tabs={tabs}
                onTabClick={onTabClick} />}
            off={
                <TabDeprecated value={type} tabs={tabs} onTabClick={onTabClick} />
            }
            name='isAppRedesigned'

        />
    )


});
