import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IChat} from '../../services/models';
import {parseMessage, parseDate} from '../../helpers';
import {getUser} from '../../services/requests';

interface ChatInfoProps extends IChat {
  containerStyle?: object;
  photoStyle?: object;
  nameStyle?: object;
  lastMessageStyle?: object;
  dateMessageStyle?: object;
  onPress?(): void;
}

const ChatInfoItem: React.FC<ChatInfoProps> = (props) => {
  const {users, name, last_message, created_at, onPress} = props;
  const isIndividualChat = (): boolean => {
    return Object.keys(users).length === 2;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.containerStyle, props.containerStyle]}>
        <View style={styles.startContainerStyle}>
          {Object.keys(users)
            .filter((id) => `${getUser().id}` !== id)
            .map((id) =>
              !isIndividualChat() ? (
                <Image
                  style={[styles.photoStyle, props.photoStyle]}
                  source={{uri: users[id].photo_url}}
                  width={styles.photoStyle.width}
                  height={styles.photoStyle.height}
                />
              ) : (
                <Image
                  style={styles.individualPhotoStyle}
                  source={{uri: users[id].photo_url}}
                  width={styles.individualPhotoStyle.width}
                  height={styles.individualPhotoStyle.height}
                />
              ),
            )}
        </View>
        <View style={styles.middleContainerStyle}>
          <Text numberOfLines={1} style={styles.nameStyle}>
            {name}
          </Text>
          <Text style={styles.lastMessageStyle}>
            {users[last_message.sender_id] &&
              `${users[last_message.sender_id].name} :`}
            {parseMessage(last_message.text)}
          </Text>
        </View>
        <View style={styles.endContainerStyle}>
          <Text style={styles.dateMessageStyle}>{parseDate(created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ImageSize = 30;

const styles = {
  containerStyle: {
    flexDirection: 'row',
    margin: 8,
  },
  startContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 50,
    justifyContent: 'center',
    margin: 8,
  },
  middleContainerStyle: {
    flex: 1,
  },
  endContainerStyle: {},
  photoStyle: {
    height: ImageSize,
    width: ImageSize,
    borderRadius: ImageSize / 2,
    borderWidth: 3,
    borderColor: 'white',
    margin: -5,
  },
  individualPhotoStyle: {
    height: ImageSize * 1.5,
    width: ImageSize * 1.5,
    borderRadius: ImageSize,
    borderWidth: 3,
    borderColor: 'white',
  },
  nameStyle: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: 'bold',
    height: 20,
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 4,
  },
  lastMessageStyle: {
    marginBottom: 8,
    marginLeft: 8,
  },
  dateMessageStyle: {
    marginTop: 8,
  },
  badgeContainerStyle: {
    backgroundColor: '#ddd',
    height: 16,
    width: 16,
    marginTop: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
    overflow: 'hidden',
    color: 'white',
    flex: 0,
  },
} as StyleSheet;
export default ChatInfoItem;
