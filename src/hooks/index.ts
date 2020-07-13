import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {compareDescDate} from './../helpers';
import {IMessage, IUser} from './../services/models';
import {
  getMessages,
  sendMessage,
  setUser,
  getUsers,
} from './../services/requests';
import {getChatList} from '../services/requests';
import {IChat} from '../services/models';

export const useChatList = (
  start?: () => void,
  end?: () => void,
): [IChat[], any] => {
  const [results, setResults] = useState<IChat[]>(null);

  useEffect(() => {
    refresh();
    return () => {};
  }, []);

  const refresh = async () => {
    start && start();
    const {data, params} = await getChatList();
    setUser({id: params.auth_user_id});
    setResults(
      data.sort((o1, o2) => compareDescDate(o1.created_at, o2.created_at)),
    );
    end && end();
  };

  return [results, refresh];
};

export const useMessages = (
  chat: IChat,
  start?: () => void,
  end?: () => void,
): [IMessage[], any?, any?] => {
  const [results, setResults] = useState<IMessage[]>(null);

  useEffect(() => {
    refresh();
    return () => {};
  }, []);

  const refresh = async () => {
    start && start();
    setResults(
      (await getMessages(`${chat.id}`)).sort((o1, o2) =>
        compareDescDate(o1.created_at, o2.created_at),
      ),
    );
    end && end();
  };

  const send = async (message: IMessage) => {
    await sendMessage(message, chat);
    await refresh();
  };
  return [results, refresh, send];
};

export const useLoading = (): [boolean, any] => {
  const [pending, setPending] = useState<boolean>(false);

  const togglePending = () => {
    setPending((prev) => !prev);
  };
  return [pending, togglePending];
};

export const useUsersList = (
  start?: () => void,
  end?: () => void,
): [IUser[], any] => {
  const [results, setResults] = useState<IUser[]>(null);

  useEffect(() => {
    search();
    return () => {};
  }, []);

  const search = async (query?: string) => {
    start && start();
    const data = await getUsers(query);
    setResults(data);
    end && end();
  };

  return [results, search];
};
