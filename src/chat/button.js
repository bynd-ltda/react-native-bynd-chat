import React from 'react';
import ChatIcon from '../../../resources/svg/chat.svg';
import ChatPlusIcon from '../../../resources/svg/chat-notification.svg';
import {TouchableOpacity} from 'react-native';
import NavigationService from '../../services/NavigationService';
import {connect} from 'react-redux';

const Button = ({results, chats}) => {
  const count = results.reduce((acc, item) => {
    if (chats[item].unread_count) {
      return chats[item].unread_count + acc;
    } else {
      return acc;
    }
  }, 0);

  const Chat = count > 0 ? ChatPlusIcon : ChatIcon;
  return (
    <TouchableOpacity onPress={() => NavigationService.navigate('ChatScene')}>
      <Chat
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: 8,
          right: 8,
        }}
        height={64}
        width={64}
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  results: state.chat.results,
  chats: state.chat.chats,
});

export default connect(mapStateToProps)(Button);
