import React, {useEffect, useState} from 'react';
import {EmptyContainer, LoadingView, Wrapper} from './styles';
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  Platform,
} from 'react-native';
import ChatItem from './item';
import {fetchAll, fetchChatInfo} from '../../redux/actions/chat';
import {connect} from 'react-redux';
import moment from 'moment';
import {getPusherInstance} from '../../redux/middleware/auth';
import {
  addPusherObserver,
  setUnreadMessages,
  setupPusher,
} from '../../services/firebase';
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../styles';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Megafone from '../../../resources/svg/megafone.svg';
import {Body1, H3, H6, Subtitle1} from '../components/Typography';
import {Margin} from '../components/Layout';

const Chat = ({
  navigation,
  chats,
  channel,
  results,
  fetchAll,
  fetchChatInfo,
  ownId,
}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setParams({
      onLeftClick: () =>
        navigation.navigate('ChatUser', {reloadList: fetchData}),
    });
    navigation.setParams({
      hasChat: true,
    });
    setLoading(true);
    setupPusher(channel);
    addPusherObserver('all', () => fetchData());
    InteractionManager.runAfterInteractions(() => {
      fetchData();
    });
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
      PushNotificationIOS.cancelAllLocalNotifications();
    }
    return () => {};
  }, []);

  const fetchData = () => {
    fetchChatInfo(
      data => {
        setList(
          data.sort((i1, i2) => {
            return (
              moment(i2.create_at).valueOf() - moment(i1.create_at).valueOf()
            );
          }),
        );
        setUnreadMessages(
          data.reduce((acc, i) => {
            return acc + i.unread_count;
          }, 0),
        );
        setLoading(false);
      },
      error => {
        setLoading(false);
      },
    );
  };

  return (
    <Wrapper>
      <FlatList
        data={list}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          fetchData();
        }}
        style={{flex: 1}}
        renderItem={({item}) => {
          return (
            <ChatItem
              user={item.user}
              messages={[item]}
              unread_count={item.unread_count}
              onPress={() =>
                navigation.navigate('ChatDetail', {
                  chatId: item.chat_id,
                  user: item.user,
                  reloadList: fetchData,
                })
              }
            />
          );
        }}
        ListEmptyComponent={
          !loading && (
            <EmptyContainer>
              <Megafone height={180} />
              <Margin all={24}>
                <H6 style={{textAlign: 'center'}}>
                  Encontre colegas e envie mensagens
                </H6>
                <Margin top={16}>
                  <Body1 style={{textAlign: 'center'}}>
                    É só clicar no botão de busca acima para iniciar as
                    conversas!
                  </Body1>
                </Margin>
              </Margin>
            </EmptyContainer>
          )
        }
      />
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  chats: state.chat.chats,
  channel:
    state.profile &&
    state.profile.loggedUser &&
    state.profile.loggedUser.channel,
  ownId:
    state.profile && state.profile.loggedUser && state.profile.loggedUser.id,
});

const ChatWrapper = props => {
  const [ChatList, setChatList] = useState(null);

  useEffect(() => {
    setChatList(
      connect(
        mapStateToProps,
        {fetchAll, fetchChatInfo},
      )(Chat),
    );
  }, []);

  const renderChat = () => {
    if (ChatList) {
      return <ChatList {...props} />;
    } else {
      return (
        <LoadingView>
          <ActivityIndicator />
        </LoadingView>
      );
    }
  };
  return <>{renderChat()}</>;
};

const MaterialHeaderButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Icon}
    iconSize={23}
    color={colors.headerText}
  />
);

const HeaderRightButton = ({onClick}) => (
  <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
    <Item iconName="search" onPress={onClick} />
  </HeaderButtons>
);

ChatWrapper.navigationOptions = props => {
  const onLeftClick = props.navigation.getParam('onLeftClick', () => {});
  return {
    title: 'Mensagens',
    headerRight: <HeaderRightButton onClick={onLeftClick} />,
  };
};
export default ChatWrapper;
