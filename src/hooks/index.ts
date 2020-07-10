import {compareDescDate} from './../helpers';
import {IMessage} from './../services/models';
import {getMessages, sendMessage} from './../services/requests';
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
    setResults(
      (await getChatList()).sort((o1, o2) =>
        compareDescDate(o1.create_at, o2.create_at),
      ),
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
      (await getMessages(`${chat.user.id}`)).sort((o1, o2) =>
        compareDescDate(o1.create_at, o2.create_at),
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
