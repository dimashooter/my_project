import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

export  interface updateFeatureFlagArgs {
  userId : string,
  features: Partial<FeatureFlags>
}

const featureFlagApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlag: build.mutation<void, updateFeatureFlagArgs>({
            query: ({userId, features}) => ({
                url: `/users/${userId}`,
                method:"PATCH",
                body:{
                  features
                }
            }),
        }),
    }),
});


export const updateFeatureFlagsMutation = featureFlagApi.endpoints.updateFeatureFlag.initiate