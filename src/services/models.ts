export interface IChat {
  id: number;
  name: string;
  created_at?: string;
  users?: {[id: number]: IUser};
  last_message: IMessage;
}

export interface IMessage {
  sender_id: number;
  id: string;
  created_at: string;
  text: string;
}

export interface IUser {
  id: number;
  name?: string;
  email?: string;
  photo_url?: string;
  tel?: string;
  last_access?: string;
}

export interface IChatMessage {}
