export interface IChat {
  id: number;
  text: string;
  create_at: string;
  chat_id: number;
  group_id: number;
  last_message: IMessage;
  user: IUser;
  unread_count: number;
}

export interface IMessage {
  id: string;
  create_at: string;
  text: string;
  sender: IUser;
}

export interface IUser {
  id: number;
  name: string;
  photo_url: string;
  tel: string;
  last_access: string;
}

export interface IChatMessage {}
