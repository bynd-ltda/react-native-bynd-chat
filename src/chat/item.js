import React from 'react';
import {Badge, BadgeText, Time} from './styles';
import MaterialListTile, {
  MaterialListTileAvatar,
  MaterialListTileAvatarSeparator,
} from '../components/MaterialList';
import {Column} from '../components/Layout';
import moment from 'moment';
import {decode} from './helpers';

export default ({user, messages, unread_count, onPress}) => {
  if (!user) {
    return <></>;
  }
  const renderMessage = list => {
    if (decode(list[list.length - 1].text).includes('/favourite')) {
      return 'Adicionado como favorito';
    }

    if (decode(list[list.length - 1].text).includes('/img')) {
      return '📷 Foto';
    }

    if (!list || list.length === 0) {
      return '';
    }
    const decodedMessage = decode(list[list.length - 1].text);
    return decodedMessage.length > 20
      ? `${decodedMessage.replace('\n', ' ').slice(0, 15)}...`
      : decodedMessage.replace('\n', ' ');
  };
  const renderDate = list => {
    if (list) {
      return '';
    }
    return moment(list[-1].create_at).format('HH:mm');
  };
  return (
    <>
      <MaterialListTile
        leading={<MaterialListTileAvatar source={{uri: user.photo_url}} />}
        title={user.name}
        subtitle={renderMessage(messages)}
        onPress={onPress}
        trailing={
          <Column>
            {(unread_count || 0) !== 0 && (
              <Badge>
                <BadgeText>{unread_count}</BadgeText>
              </Badge>
            )}
            <Time>{renderDate(messages)}</Time>
          </Column>
        }
      />
      <MaterialListTileAvatarSeparator />
    </>
  );
};
