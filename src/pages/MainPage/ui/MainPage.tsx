import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { HStack } from 'shared/ui/Stack';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <HStack>
            {t('Главная страница')}

        </HStack>
    );
};

export default MainPage;
