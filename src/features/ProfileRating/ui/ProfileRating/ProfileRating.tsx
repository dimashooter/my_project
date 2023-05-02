import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import {
    useProfileRating,
    useRateProfile,
} from '../../ProfileRatingApi/ProfileRatingApi';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}
const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, profileId } = props;
    const { t } = useTranslation();
    const user = useSelector(getUserAuthData);
    const [RateProfileMutation] = useRateProfile();

    const { data, isLoading } = useProfileRating({
        profileId,
        userId: user?.id ?? '',
    });

    const rating = data?.[0];

    const handleRateProfile = useCallback(
        (star: number) => {
            try {
                RateProfileMutation({
                    profileId,
                    userId: user?.id ?? '',
                    rate: star,
                });
            } catch (error) {
                console.log(error);
            }
        },
        [RateProfileMutation, profileId, user?.id],
    );

    const onAccept = useCallback(
        (star: number) => {
            handleRateProfile(star);
            console.log('test');
        },
        [handleRateProfile],
    );

    if (isLoading) {
        return <Skeleton width="100%" height={140} />;
    }
    return (
        <RatingCard
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оценить профиль')}
        />
    );
});

export default ProfileRating;
