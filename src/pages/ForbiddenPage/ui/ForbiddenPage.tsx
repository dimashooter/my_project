import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const ForbiddenPage = () => {
    const { t } = useTranslation('main');
    return (
        <Page>{t('forbidden_text')}</Page>
    );
};

export default ForbiddenPage;
