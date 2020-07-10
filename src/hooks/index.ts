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
