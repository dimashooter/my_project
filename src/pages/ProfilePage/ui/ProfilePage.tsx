import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EditableProfileCard } from '@/features/EditableProfileCard/ui/EditableProfileCard/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getFeatureFlag } from '@/shared/lib/features';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const flag = getFeatureFlag('isArticleRatingEnable')

    if (!id) {
        return <Text text={t('no_id')} />;
    }
    return (
        <Page data-testid="ProfilePage" className={classNames('', {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
