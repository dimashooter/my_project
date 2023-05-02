import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { Page } from '@/widgets/Page/Page';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props
    const { t } = useTranslation();
    return (
        // eslint-disable-next-line react/destructuring-assignment
        <Page data-testid="NotFoundPage"
            className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Page>
    );
};
