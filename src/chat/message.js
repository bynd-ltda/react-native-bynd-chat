import {
  BubbleContainer,
  BubbleContent,
  BubbleTimestamp,
  BubbleTimestampContainer,
  BubbleWrapper,
  FavouriteRadius,
  FavouriteText,
  FavouriteView,
} from './styles';
import moment from 'moment';
import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {decode} from './helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../styles';
import {Image, TouchableOpacity} from 'react-native';
import {NavigationService} from '../../services';
import {showImage} from '../../redux/actions/ui';
import ChatImageViewer from './image';

export default props => {
  return <ChatContainerUser {...props} />;
};

const ChatContainerUserComponent = ({
  sender,
  read_at,
  receiver,
  ownId,
  text,
  create_at,
  last_message,
}) => {
  let date = moment(create_at).format('hh:mm A');
  if (moment(create_at).isBefore(moment().startOf('d'))) {
    date = moment(create_at).format('hh:mm (DD/MMM/YYYY)');
  }
  if (text.includes('/favourite')) {
    return (
      <FavouritesInviteMessage
        isOwn={sender.id === ownId}
        userName={receiver.name}
      />
    );
  }


  if (sender.id !== ownId) {
    return (
      <BubbleContainer isLeft>
        <BubbleWrapper isLeft>
          <Message isLeft>{text}</Message>
          <BubbleTimestamp isLeft>{date}</BubbleTimestamp>
        </BubbleWrapper>
      </BubbleContainer>
    );
  } else {
    return (
      <BubbleContainer>
        <BubbleWrapper>
          <Message>{text}</Message>
          <BubbleTimestampContainer>
            <BubbleTimestamp>{date}</BubbleTimestamp>
            {read_at ? (
              <Icon
                style={[{color: colors.primary}]}
                size={15}
                name={'check-all'}
              />
            ) : (
              <Icon style={[{color: 'gray'}]} size={15} name={'check'} />
            )}
          </BubbleTimestampContainer>
        </BubbleWrapper>
      </BubbleContainer>
    );
  }
};

const FavouritesInviteMessage = ({isOwn, userName}) => (
  <FavouriteView>
    <FavouriteRadius>
      <FavouriteText>
        {isOwn
          ? `Você adicionou ${userName} como favorito`
          : 'Você foi adicionado como favorito'}
      </FavouriteText>
    </FavouriteRadius>
  </FavouriteView>
);

const ImageMessage = ({text}) => {
  const [visible, setVisible] = useState(false);
  const base64 = decode(text)
    .replace('/img_url ', '')
    .replace('/img ', '');
  return (
    <>
      <ChatImageViewer visible={visible} url={base64} onClose={()=>setVisible(false)}/>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Image
          style={{width: 200, height: 200}}
          width={200}
          height={200}
          source={{uri: base64}}
        />
      </TouchableOpacity>
    </>
  );
};

const Message = ({children, isLeft}) => {
  if (children.includes('/img')) {
    return <ImageMessage text={children} />;
  }
  return <BubbleContent isLeft={isLeft}>{decode(children)}</BubbleContent>;
};

const mapStateToProps = state => ({
  ownId:
    state.profile && state.profile.loggedUser && state.profile.loggedUser.id,
});
const ChatContainerUser = connect(mapStateToProps)(ChatContainerUserComponent);
