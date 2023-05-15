export { initAuthData } from './model/services/initAuthData';

export  { saveJsonSettings } from './model/services/saveJsonSettings';

export { useJsonSettings,getJsonSettings } from './model/selectors/jsonSettings';

export {
    getUserRole,
    isUser,
    isUserAdmin,
    isUserCopyrighter,
} from './model/selectors/getuserRole/getUserRole';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
