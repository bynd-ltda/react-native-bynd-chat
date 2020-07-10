import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IChat} from '../../services/models';
import {parseMessage, parseDate} from '../../helpers';

interface ChatInfoProps extends IChat {
  containerStyle?: object;
  photoStyle?: object;
  nameStyle?: object;
  lastMessageStyle?: object;
  dateMessageStyle?: object;
  onPress?(): void;
}

const ChatInfoItem: React.FC<ChatInfoProps> = (props) => {
  const {user, text, create_at, unread_count, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.containerStyle, props.containerStyle]}>
        <View style={styles.startContainerStyle}>
          <Image
            style={[styles.photoStyle, props.photoStyle]}
            source={{uri: user.photo_url}}
            width={styles.photoStyle.width}
            height={styles.photoStyle.height}
          />
        </View>
        <View style={styles.middleContainerStyle}>
          <Text style={styles.nameStyle}>{user.name}</Text>
          <Text style={styles.lastMessageStyle}>{parseMessage(text)}</Text>
        </View>
        <View style={styles.endContainerStyle}>
          <Text style={styles.dateMessageStyle}>{parseDate(create_at)}</Text>
          <Text style={styles.badgeContainerStyle}>{unread_count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ImageSize = 60;

const styles = {
  containerStyle: {
    flexDirection: 'row',
    margin: 8,
  },
  startContainerStyle: {},
  middleContainerStyle: {
    flex: 1,
  },
  endContainerStyle: {},
  photoStyle: {
    height: ImageSize,
    width: ImageSize,
    borderRadius: ImageSize / 2,
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
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
