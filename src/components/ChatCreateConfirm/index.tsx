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
import {useNavigation, useRoute} from '@react-navigation/native';
import {createChat} from '../../services/requests';

const ChatCreate = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [users, setUsers] = useState<IUser[]>([
    ...Object.values(route.params.users),
  ]);

  const removeUser = (user: IUser) => {
    setUsers((state) => {
      return state.filter((_u) => _u.id !== user.id);
    });
  };

  const submit = async () => {
    try {
      const chat = await createChat({
        users: users.map((i) => i.email),
      });
      navigation.navigate('BChatDetail', chat);
    } catch (err) {}
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Text>Você irá adicionar esses colegas</Text>
      <FlatList<IUser>
        contentContainerStyle={styles.containerListStyle}
        data={users}
        renderItem={({item}) => (
          <UserComponent
            {...item}
            selected={true}
            onSelect={() => removeUser(item)}
          />
        )}
      />
      <TouchableOpacity onPress={submit}>
        <Text>Confirmar</Text>
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
