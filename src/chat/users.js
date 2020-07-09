import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getUsers} from '../../redux/actions/auth';
import MaterialListTile, {
  MaterialListTileAvatar,
  MaterialListTileAvatarSeparator,
} from '../components/MaterialList';
import Message from '../../../resources/img/svgs/bynd/message.svg';
import {openWhatsapp} from '../../services/helpers';
import {ColorButton} from '../../components';
import {NavigationService} from '../../services';

let timer = null;
const UserSearch = ({getUsers, navigation}) => {
  const [q, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [pending, setPending] = useState(false);

  const search = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setPending(true);
      getUsers(
        q,
        data => {
          setList(data);
          setPending(false);
        },
        err => {
          setPending(false);
        },
      );
    }, 400);
  };

  useEffect(() => {
    if (q.length >= 1) {
      search();
    }
  }, [q]);

  return (
    <KeyboardAvoidingView>
      <SearchBar
        placeholder="Digite o nome"
        onChangeText={setQuery}
        showLoading={pending}
        lightTheme
        autoFocus
        value={search}
      />
      <FlatList
        data={list}
        keyboardShouldPersistTaps="always"
        renderItem={({item}) => (
          <UserContainer
            onPress={() => {
              navigation.navigate('Home');
              navigation.navigate('ChatDetail', {
                user: item,
                reloadList: navigation.getParam('reloadList'),
              });
            }}
            {...item}
          />
        )}
      />
    </KeyboardAvoidingView>
  );
};

export const UserContainer = ({id, name, photo_url, email, job, onPress}) => (
  <>
    <MaterialListTile
      leading={<MaterialListTileAvatar source={{uri: photo_url}} />}
      title={name}
      subtitle={`${job} (${email})`}
      onPress={onPress}
      trailing={
        <TouchableOpacity
          onPress={() => {
            NavigationService.goBack();
            NavigationService.navigate('Chat');
            NavigationService.navigate('ChatDetail', {
              user: {id, name, photo_url, job},
            });
          }}>
          <Message />
        </TouchableOpacity>
      }
    />
    <MaterialListTileAvatarSeparator />
  </>
);

UserSearch.navigationOptions = {
  title: 'Buscar usuários',
};

const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  {getUsers},
)(UserSearch);
