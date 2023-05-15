import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('users/initAuthData', async (_, thunkApi) => {
    const { rejectWithValue,dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

    if(!userId){
      return rejectWithValue('')
    }
    try {
        const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()
        console.log(response);
        
        return response
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
