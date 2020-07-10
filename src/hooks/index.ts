import {IMessage} from './../services/models';
import {getMessages} from './../services/requests';
import React, {useState, useEffect} from 'react';
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
    setResults(await getChatList());
    end && end();
  };

  return [results, refresh];
};

export const useMessages = (
  chat: IChat,
  start?: () => void,
  end?: () => void,
): [IMessage[], any] => {
  const [results, setResults] = useState<IMessage[]>(null);

  useEffect(() => {
    refresh();
    return () => {};
  }, []);

  const refresh = async () => {
    start && start();
    setResults(await getMessages(`${chat.user.id}`));
    end && end();
  };
  return [results, refresh];
};

export const useLoading = (): [boolean, any] => {
  const [pending, setPending] = useState<boolean>(false);

  const togglePending = () => {
    setPending((prev) => !prev);
  };
  return [pending, togglePending];
};
