export interface IChat {
  id: number;
  text: string;
  create_at: string;
  chat_id: number;
  group_id: number;
  user: IUser;
}

export interface IUser {
  id: number;
  name: string;
  photo_url: string;
  tel: string;
  last_access: string;
}

export interface IChatMessage {}
