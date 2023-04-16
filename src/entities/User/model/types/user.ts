export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  COPYRIGHTER = 'COPYRIGHTER'
}

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
