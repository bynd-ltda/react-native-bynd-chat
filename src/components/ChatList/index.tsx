import React, {useState} from 'react';
import {FlatList} from 'react-native';
import ChatInfoItem from '../ChatInfoItem';
import {IChat} from '../../services/models';
import item from '../../chat/item';
import {useChatList} from '../../hooks';

interface IChatListProps {
  results: IChat[];
  refresh(): null;
}

const ChatListComponent: React.FC<IChatListProps> = ({}) => {
  const [pending, setPending] = useState<boolean>(false);

  const showLoading = () => {
    setPending(true);
  };
  const hideLoading = () => {
    setPending(false);
  };
  const [chats, onReload] = useChatList(showLoading, hideLoading);

  return (
    <>
      <FlatList<IChat>
        data={chats}
        onRefresh={onReload}
        refreshing={pending}
        renderItem={({item}) => <ChatInfoItem {...item} />}
      />
    </>
  );
};

export default ChatListComponent;
