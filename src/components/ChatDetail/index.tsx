import React, { useRef } from 'react';
import {useMessages, useLoading} from '../../hooks';
import {IChat, IMessage} from '../../services/models';
import {useRoute} from '@react-navigation/native';

import {
  Text,
  SafeAreaView,
  SectionList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import ChatMessage from '../ChatMessage';
import {sectionsFrom} from '../../helpers';
import moment from 'moment';
import ChatMessageInput from '../ChatMessageInput';

interface IChatDetailProps {}

const ChatDetailComponent: React.FC<IChatDetailProps> = (props) => {
  const route = useRoute();
  const chat = route.params as IChat;
  const users = chat.users;


  const [pending, togglePending] = useLoading();
  const [messages, reload, send] = useMessages(
    chat,
    togglePending,
    togglePending
  );
  const sections = sectionsFrom<IMessage>(
    messages,
    (message) => moment(message.created_at).format('YYYY-MM-DD'),
    (section) => moment(section).format('L'),
  );

  const sectionsList = useRef<SectionList>()


  const submit = (message:IMessage) => {
    send(message)
    sectionsList.current.scrollToLocation({
      animated: true,
      sectionIndex: 0,
      itemIndex: 0,
      viewPosition: 0
    })
  }
  return (
      <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
          <SectionList<IMessage>
            ref={ref => sectionsList.current = ref}
            sections={sections}
            style={{ flex:1, padding:16}}
            stickySectionHeadersEnabled
            inverted
            renderSectionFooter={({section: {title}}) => <SectionComponent>{title}</SectionComponent>}
            keyExtractor={(item, key) => `${item.id} + ${key}`}
            renderItem={({item, section, index}) => (
              <ChatMessage
                {...item}
                sender={users[item.sender_id]}
                next={
                  index < section.data.length ? section.data[index + 1] : null
                }
                previous={index > 0 ? section.data[index - 1] : null}
              />
            )}
            refreshing={pending}
            onRefresh={reload}
          />
        <ChatMessageInput onSubmit={submit} />
      </KeyboardAvoidingView>
  );
};

const SectionComponent = ({children}) => {
  return <Text style={{textAlign:'center', color:'#8E8E8E'}}>{moment(children).isValid() && moment(children).format('LL')}</Text>
}

const styles = StyleSheet.create({
  messageListStyle: {
    flexDirection: 'column',
    flex:1
  },
});

export default ChatDetailComponent;
