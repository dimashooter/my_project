import { Accordion } from 'shared/ui/Accordion/Accordion';
import { useTranslation } from 'react-i18next';
import { HStack } from 'shared/ui/Stack';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Accordion />
    );
};

export default MainPage;
