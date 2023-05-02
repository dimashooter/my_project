import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';

interface AdminPanelProps {
    className?: string;
}
export const AdminPanelPage = memo((props: AdminPanelProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <Page className={classNames('', {}, [className])}>
            {t('Admin_panel')}
        </Page>
    );
});
