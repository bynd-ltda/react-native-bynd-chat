import React from 'react';
import {FlatList} from 'react-native';
import ChatInfoItem from '../ChatInfoItem';
import {IChat} from '../../services/models';
import {useChatList, useLoading} from '../../hooks';
import {useNavigation} from '@react-navigation/native';

const ChatListComponent: React.FC<IChatListProps> = ({}) => {
  const [pending, togglePending] = useLoading();
  const navigation = useNavigation();

  const [chats, onReload] = useChatList(togglePending, togglePending);
  return (
    <>
      <FlatList<IChat>
        data={chats}
        onRefresh={onReload}
        refreshing={pending}
        renderItem={({item}) => (
          <ChatInfoItem
            {...item}
            onPress={() => {
              navigation.navigate('BChatDetail', item);
            }}
          />
        )}
      />
    </>
  );
};

export default ChatListComponent;
