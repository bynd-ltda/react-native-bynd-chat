import {decode} from '../../helpers';
import React from 'react';
import {Image} from 'react-native';

export const ChatImageMessage: React.FC<IChatMessageProps> = ({text}) => {
  const base64 = decode(text).replace('/img_url ', '');
  return (
    <>
      <Image
        style={{width: 200, height: 200}}
        width={200}
        height={200}
        source={{uri: base64}}
      />
    </>
  );
};
