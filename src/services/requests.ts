import {IChat, IMessage, IUser} from './models';
import axios, {AxiosInstance} from 'axios';
export const ADD_MESSAGE_URL = 'v3/chat/message';
export const UPLOAD_MESSAGE_URL = 'v3/chat/upload';
export const CREATE_GROUP = 'v3/chat/groups';
export const ADD_USER_TO_CHAT = (id: number) => `groups/${id}/add-user`;

export const FETCH_MESSAGES_URL = 'v3/chat/messages';
export const FETCH_MESSAGES_COUNT_URL = 'v3/chat/info/unread';
export const FETCH_MESSAGES_CHAT_URL = 'v3/chat/messages';
export const FETCH_CHAT_INFO = 'v3/chat/info';
export const FETCH_USERS = 'v2/users';

let _setup: IBChatSetup = null;
let _axios: AxiosInstance = null;
let _user: IUser = null;
interface IBChatSetup {
  server_key: string;
  user_id: string;
  base_url: string;
  axios_setup?: any;
}

interface IResponseData<T, V = null> {
  data: T;
  params?: V;
}

interface IUserResponse {
  auth_user_id: number;
}

export const initBChat = (setup: IBChatSetup) => {
  _setup = setup;
  _axios = axios.create({
    baseURL: setup.base_url,
    headers: {
      Authorization: `Basic ${btoa(`${setup.user_id}:${setup.server_key}`)}`,
    },
  });
};

export const setUser = (user: IUser) => {
  _user = user;
};

export const getUser = (): IUser => {
  return _user;
};

export const getBChatSetup = () => {
  if (!_setup) {
    throw Error('BChat is not configured, use initBChat');
  }

  return _setup;
};

export const sendMessage = async (
  message: IMessage,
  chat: IChat,
): Promise<IMessage> => {
  try {
    const response = await _axios.post<IResponseData<IMessage>>(
      ADD_MESSAGE_URL,
      {
        text: message.text,
        group_id: chat.id,
      },
    );
    return response.data.data;
  } catch (error) {}
};

export const getChatList = async (): Promise<
  IResponseData<IChat[], IUserResponse>
> => {
  try {
    const response = await _axios.get<IResponseData<IChat[], IUserResponse>>(
      FETCH_CHAT_INFO,
    );
    return response.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return null;
};

export const getMessages = async (chat_id: string) => {
  try {
    const response = await _axios.get<IResponseData<IMessage[], IUserResponse>>(
      FETCH_MESSAGES_CHAT_URL,
      {params: {chat_id}},
    );
    return response.data.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return [];
};

interface IGroupSetup {
  name?: string;
  users: string[];
}

export const createChat = async (setup: IGroupSetup): Promise<IChat> => {
  try {
    const response = await _axios.post<IResponseData<IChat>>(CREATE_GROUP, {
      ...setup,
    });
    return response.data.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return null;
};

export const addUserToChat = async (chat: IChat, user_email: string) => {
  try {
    const response = await _axios.post(ADD_USER_TO_CHAT(chat.id), {
      data: {
        email: user_email,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return [];
};

export const getUsers = async (query: string): Promise<IUser[]> => {
  try {
    const response = await _axios.get<IResponseData<IUser[]>>(FETCH_USERS, {
      params: {
        search: query,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return [];
};
