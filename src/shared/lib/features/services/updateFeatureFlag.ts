import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagArgs, updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

export const updateFeatureFlag = createAsyncThunk<
    void,
    updateFeatureFlagArgs,
    ThunkConfig<string>
// eslint-disable-next-line consistent-return
>('articleDetails/fetchArticleById', async ({userId,features}, thunkApi) => {
    const {  rejectWithValue,dispatch } = thunkApi;

    const newFeatures = {
        ...getAllFeatureFlags(),
        ...features
    }
    try {
        await dispatch(updateFeatureFlagsMutation({userId,features:newFeatures}))
        setFeatureFlags(newFeatures)

        window.location.reload()
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
