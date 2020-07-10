import moment from 'moment';

export const decode = (text: string): string => {
  try {
    return decodeURI(text);
  } catch (e) {
    return text;
  }
};

export const encode = (text: string): string => {
  try {
    return encodeURI(text);
  } catch (e) {
    return text;
  }
};

export const parseMessage = (message: string): string => {
  if (decode(message).includes('/favourite')) {
    return 'Adicionado como favorito';
  }

  if (decode(message).includes('/img')) {
    return '📷 Foto';
  }

  if (!message) {
    return '';
  }
  const decodedMessage = decode(message);
  return decodedMessage.length > 20
    ? `${decodedMessage.replace('\n', ' ').slice(0, 15)}...`
    : decodedMessage.replace('\n', ' ');
};

export const parseDate = (date: string): string => {
  const mDate = moment(date);
  return mDate.format('L');
};

export const compareDescDate = (i1: string, i2: string) => {
  return moment(i2).valueOf() - moment(i1).valueOf();
};
