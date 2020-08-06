import React from 'react';
import {IUser} from '../../services/models';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface UserComponentProps extends IUser {
  selected: boolean;
  onSelect(user: IUser): void;
  containerStyle?: any;
}

const ImageSize = 40;

const UserComponent: React.FC<UserComponentProps> = (props) => {
  return (
    <TouchableOpacity
      style={[styles.containerStyle, props.containerStyle]}
      onPress={() => props.onSelect(props)}>
      <Image
        style={styles.imageStyle}
        source={{uri: props.photo_url}}
        width={ImageSize}
        height={ImageSize}
      />
      <View style={styles.middleStyle}>
        <Text style={styles.nameStyle}>{props.name}</Text>
        <Text style={styles.emailStyle}>{props.email}</Text>
      </View>
      <View>
        <Text
          style={
            props.selected ? styles.selectedStyle : styles.unselectedStyle
          }>
          {props.selected ? '-' : '+'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 16,
    alignItems: 'center',
  },
  imageStyle: {
    width: ImageSize,
    height: ImageSize,
    borderRadius: ImageSize / 2,
  },
  middleStyle: {
    margin: 8,
    flex:1
  },
  nameStyle: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: 'bold',
    height: 20,
  },
  emailStyle: {},
  selectedStyle: {
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 12,
    width: 24,
    height: 24,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'purple',
  },
  unselectedStyle: {
    width: 24,
    height: 24,
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'purple',
  },
});

export default UserComponent;
