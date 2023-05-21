    import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { LOCAL_STORAGE_LAST_THEME_KEY } from '@/app/providers/ThemeProvider/lib/ThemeContext';

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
        localStorage.setItem(LOCAL_STORAGE_LAST_THEME_KEY,response.features?.isAppRedesigned ? 'new' : 'old')
        return response
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
