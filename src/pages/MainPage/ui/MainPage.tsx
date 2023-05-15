import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/deprecated/Text/Text';

const MainPage = () => {
    const { t } = useTranslation();


    return <Page data-testid='MainPage'>
        <ToggleFeatures name='isArticleRatingEnable' on={<Text title="ON" />}
            off={<Text title="OFF" />} />
    </Page>;
};

export default MainPage;
