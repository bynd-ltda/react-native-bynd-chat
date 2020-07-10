import {IChat, IMessage, IUser} from './models';
import axios, {AxiosInstance} from 'axios';
export const ADD_MESSAGE_URL = `chat/message`;
export const UPLOAD_MESSAGE_URL = `chat/upload`;
export const FETCH_MESSAGES_URL = `chat/messages`;
export const FETCH_MESSAGES_COUNT_URL = `chat/info/unread`;
export const FETCH_MESSAGES_CHAT_URL = (chatId) => `chat/messages/${chatId}`;
export const FETCH_CHAT_INFO = `chat/info`;
export const FETCH_USER_INFO = '/auth';

let _setup: IBChatSetup = null;
let _axios: AxiosInstance = null;
let _user: IUser = null;
interface IBChatSetup {
  server_key: string;
  user_id: string;
  base_url: string;
  axios_setup?: any;
}

interface IResponseData<T> {
  data: T;
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
        user_id: chat.user.id,
      },
    );
    return response.data.data;
  } catch (error) {}
};

export const getChatList = async () => {
  try {
    const response = await _axios.get<IResponseData<IChat[]>>(FETCH_CHAT_INFO);
    return response.data.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return [];
};

export const getMessages = async (chat_id: string) => {
  try {
    const response = await _axios.get<IResponseData<IMessage[]>>(
      FETCH_MESSAGES_CHAT_URL(chat_id),
    );
    return response.data.data;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return [];
};
