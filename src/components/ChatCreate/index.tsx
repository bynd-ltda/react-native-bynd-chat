import React, {useState} from 'react';
import {useUsersList, useLoading} from '../../hooks';
import {
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {IUser} from '../../services/models';
import UserComponent from '../User';
import {add} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import { BackgroundColor } from '../../chat/styles';

const ChatCreate = () => {
  const [pending, toggle] = useLoading();
  const [users, search] = useUsersList(toggle, toggle);
  const [selected, updateSelectedUsers] = useState([]);
  const [query, setQuery] = useState('');

  const navigation = useNavigation();

  const toggleUser = (user: IUser) => {
    if (!selected.includes(user.id)) {
      updateSelectedUsers((state) => {
        return [...state, user.id];
      });
    } else {
      updateSelectedUsers((state) => {
        return [...state.filter(i=>i!=user.id)];
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.containerListStyle}>
        <FlatList<IUser>
          refreshing={pending}
          onRefresh={() => search('')}
          data={
            users &&
            users.filter((i) =>
              i.email.toLowerCase().includes(query.toLowerCase()),
            )
          }
          renderItem={({item}) => (
            <UserComponent
              {...item}
              selected={selected.includes(item.id)}
              onSelect={(user) => toggleUser(user)}
            />
          )}
        />
        <View style={styles.buttonViewStyle}>
        <TouchableOpacity
        style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate('BChatCreateConfirm', {users: selected})
          }>
          <Text style={{color: '#7726A6'}}>Próximo</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection:'column',
    backgroundColor: 'red',
  },
  containerListStyle: {
    height: '98%'
  },
  buttonViewStyle:{
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  buttonStyle:{
    width: 200,
    alignItems:'center',
    borderWidth: 1,
    paddingLeft:36,
    paddingRight:36,
    borderRadius: 26,
    padding: 16,
    borderColor: '#7726A6',
    margin:18
  }
});
export default ChatCreate;
