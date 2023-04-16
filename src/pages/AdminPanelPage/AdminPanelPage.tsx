import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';

interface AdminPanelProps {
    className?: string
}
export const AdminPanelPage = memo((props: AdminPanelProps) => {
    const { className } = props;
    return (
        <Page className={classNames('', {}, [className])}>
            Admin panel page
        </Page>
    );
});
