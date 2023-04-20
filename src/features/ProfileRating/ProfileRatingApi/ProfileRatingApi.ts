import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface getProfileRating {
  userId:string,
  profileId:string
}
interface rateProfile {
    userId:string,
    profileId:string
    rate:number
}

const ProfileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], getProfileRating>({
            query: ({ profileId, userId }) => ({
                url: 'profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        rateProfile: build.mutation<void, rateProfile>({
            query: (data) => ({
                url: 'profile-ratings',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const useProfileRating = ProfileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = ProfileRatingApi.useRateProfileMutation;
