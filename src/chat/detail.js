import React, {useEffect, useRef, useState} from 'react';
import {
  BackgroundColor,
  ImageButton,
  InputButton,
  InputContainer,
  SendContainer,
  shadowInput,
  TextInput,
  TopBorder,
  Wrapper,
} from './styles';
import {
  BackHandler,
  FlatList,
  ImageBackground,
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ChatMessage from './message';
import {
  addMessage,
  clearBadge,
  createChat,
  fetchChatMessages,
  parseToChatId,
  sendMessage,
  sendMessageRequest,
  uploadImage,
} from '../../redux/actions/chat';
import {connect, useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setActiveChat} from '../../redux/actions/ui';
import {callNumber, isIphoneX} from '../../services/helpers';
import moment from 'moment';
import {getPusherInstance} from '../../redux/middleware/auth';
import {encode} from './helpers';
import {addPusherObserver, removePusherObserver} from '../../services/firebase';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialHeaderButton from '../components/MaterialHeaderButton';
import ImagePicker from 'react-native-image-crop-picker';

const sortMessages = (i1, i2) => {
  return moment(i2.create_at).valueOf() - moment(i1.create_at).valueOf();
};

let timer = null;

const ChatDetail = ({
  navigation: {getParam, setParams, navigate, pop},
  setActiveChat,
  loggedUser,
  chatId,
  clearBadge,
  channel,
  initialMessages,
  sendMessageRequest,
  fetchChatMessages,
}) => {
  const [pendingMsg, setPendingMsg] = useState('');
  const [chatList, setChatList] = useState([]);
  const [pending, setPending] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  let inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      fetch();
      addPusherObserver(chatId, data => {
        clearTimeout(timer);
        setTimeout(fetch, 1000);
      });
      setParams({
        onLeftClick: () => {
          callNumber(getParam('user').tel);
        },
      });
      BackHandler.addEventListener('onPress', pop);
    });
    return () => {
      removePusherObserver(chatId);
      getParam('reloadList', () => {})();
      getParam();
    };
  }, []);

  const fetch = () => {
    setPending(true);
    fetchChatMessages(
      getParam('user').id,
      limit,
      offset,
      data => {
        const newList = data.sort(sortMessages);
        setPending(false);
        inputRef.current.focus();
        setChatList(newList);
      },
      error => {
        setPending(false);
      },
    );
  };

  const onSubmit = () => {
    sendMessage(pendingMsg);
  };

  const sendMessage = (pendingMsg=pendingMsg) => {
    if (!isEmpty(pendingMsg)) {
      const message = {
        sender: loggedUser,
        ownId: loggedUser.id,
        text: pendingMsg,
        create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      setPendingMsg('');
      addMessageToChat(message);
      sendMessageRequest(
        encode(pendingMsg),
        getParam('user').id,
        data => {
          setSubmitting(false);
        },
        error => {
          alert(error)
          setSubmitting(false);
        },
      );
    }
  };

  const addMessageToChat = message => {
    setChatList([message, ...chatList]);
  };

  const onSubmitEditing = () => {
    if (!pendingMsg.endsWith('\n')) {
      setPendingMsg(pendingMsg + '\n');
    }
  };

  const onOpenCamera = async () => {
    await ImagePicker.clean();
    try {
      let image = await ImagePicker.openCamera({
        width: 650,
        height: 650,
        includeBase64: true,
        cropping: true,
      });
      dispatch(
        uploadImage(
          `data:${image.mime};base64,${image.data}`,
          ({url}) => {
            sendMessage(`/img_url ${url}`);
          },
          err => console.error(err),
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onImageSelect = async () => {
    await ImagePicker.clean();
    try {
      let image = await ImagePicker.openPicker({
        width: 650,
        height: 650,
        includeBase64: true,
        cropping: true,
      });
      dispatch(
        uploadImage(
          `data:${image.mime};base64,${image.data}`,
          ({url}) => {
            sendMessage(`/img_url ${url}`);
          },
          err => console.error(err),
        ),
      );
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <>
      <KeyboardAvoidWrapper>
        <BackgroundColor color="white">
          <ImageBackground
            style={{
              flex: 1,
              height: 400,
              width: '100%',
            }}>
            <FlatList
              style={{flex: 1}}
              refreshing={pending}
              onRefresh={fetch}
              data={chatList}
              contentContainerStyle={{paddingBottom: 26}}
              extraData={chatList && chatList.length}
              inverted
              onEndReachedThreshold={0.5}
              renderItem={({item}) => (
                <ChatMessage
                  {...item}
                  last_message={chatList[0]}
                  receiver={getParam('user')}
                />
              )}
            />
          </ImageBackground>
          <TopBorder>
            <SendContainer>
              <InputContainer>
                <TextInput
                  ref={inputRef}
                  style={shadowInput}
                  placeholder="Digite sua mensagem"
                  value={pendingMsg}
                  multiline={true}
                  onChangeText={setPendingMsg}
                  onSubmitEditing={onSubmitEditing}
                  blurOnSubmit={false}
                />
              </InputContainer>
              {pendingMsg.length === 0 && (
                <>
                  <ImageButton onPress={onOpenCamera} style={shadowInput}>
                    <Icons name="camera" color="#2FC9D2" size={28} />
                  </ImageButton>
                  <ImageButton onPress={onImageSelect} style={shadowInput}>
                    <Icons name="image" color="#2FC9D2" size={28} />
                  </ImageButton>
                </>
              )}
              <InputButton
                onPress={!submitting && onSubmit}
                style={shadowInput}>
                <Icons name="send" color="#2FC9D2" size={28} />
              </InputButton>
            </SendContainer>
          </TopBorder>
        </BackgroundColor>
      </KeyboardAvoidWrapper>
    </>
  );
};

const KeyboardAvoidWrapper = ({children}) => {
  let pd = {};
  if (Platform.OS === 'ios') {
    pd = {};
  }

  return (
    <Wrapper>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({
          ios: isIphoneX() ? 85 : 65,
          android: 25,
        })}
        behavior={Platform.select({ios: 'padding', android: null})}
        style={{flex: 1}}>
        {children}
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const mapStateToProps = (state, {navigation: {getParam}}) => {
  const chatId = parseToChatId(getParam('user'), state.profile.loggedUser);
  return {
    loggedUser: state.profile.loggedUser,
    initialMessages: state.chat.chats[chatId]
      ? state.chat.chats[chatId].messages
      : [],
    channel:
      state.profile &&
      state.profile.loggedUser &&
      state.profile.loggedUser.channel,
    chatId: chatId,
    ownId:
      state.profile && state.profile.loggedUser && state.profile.loggedUser.id,
  };
};

const HeaderRightButton = ({onClick}) => (
  <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
    <Item iconName="phone" onPress={onClick} />
  </HeaderButtons>
);

ChatDetail.navigationOptions = props => {
  const user = props.navigation.getParam('user');
  const onLeftClick = props.navigation.getParam('onLeftClick', () => {});

  return {
    title: user.name,
    headerRight: <HeaderRightButton onClick={onLeftClick} />,
  };
};

export default connect(
  mapStateToProps,
  {
    addMessage,
    setActiveChat,
    sendMessage,
    fetchChatMessages,
    sendMessageRequest,
    createChat,
    clearBadge,
  },
)(ChatDetail);
