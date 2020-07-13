import React, {useState} from 'react';
import {useUsersList, useLoading} from '../../hooks';
import {
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {IUser} from '../../services/models';
import UserComponent from '../User';
import {add} from 'lodash';
import {useNavigation} from '@react-navigation/native';

const ChatCreate = () => {
  const [pending, toggle] = useLoading();
  const [users, search] = useUsersList(toggle, toggle);
  const [selected, updateSelectedUsers] = useState({});
  const [query, setQuery] = useState('');

  const navigation = useNavigation();

  const toggleUser = (user: IUser) => {
    if (selected[user.id] !== undefined) {
      updateSelectedUsers((state) => {
        return {...state, [user.id]: null};
      });
    } else {
      updateSelectedUsers((state) => {
        return {...state, [user.id]: user};
      });
    }
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <TextInput value={query} onChangeText={setQuery} />
      <FlatList<IUser>
        refreshing={pending}
        contentContainerStyle={styles.containerListStyle}
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
            selected={selected[item.id] !== null}
            onSelect={(user) => toggleUser(user)}
          />
        )}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BChatCreateConfirm', {users: selected})
        }>
        <Text>Próximo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
  },
  containerListStyle: {},
});
export default ChatCreate;
