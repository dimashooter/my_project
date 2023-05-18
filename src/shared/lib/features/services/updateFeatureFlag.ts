import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagArgs, updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

export const updateFeatureFlag = createAsyncThunk<
    void,
    updateFeatureFlagArgs,
    ThunkConfig<string>
// eslint-disable-next-line consistent-return
>('articleDetails/fetchArticleById', async ({userId,features}, thunkApi) => {
    const {  rejectWithValue,dispatch } = thunkApi;

    try {
        await dispatch(updateFeatureFlagsMutation({userId,features:{
          ...getAllFeatureFlags(),
          ...features
        }}))

        window.location.reload()
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
