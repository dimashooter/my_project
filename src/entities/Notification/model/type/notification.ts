export interface Notification {
  id:string,
  title:string
  description:string
  userId:string
  href?:string
}

export interface NotificationSchema {
  isLoading: boolean;
  error?: string;
  data?: Notification;
}
