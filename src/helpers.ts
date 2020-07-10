import moment from 'moment';
import {SectionListData} from 'react-native';

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

export const sectionsFrom = <T>(
  data: T[],
  criteria: (item: T) => string,
  naming?: (section: string) => string,
): SectionListData<T>[] => {
  if (!data) return [];
  let list = {};
  data.forEach((item) => {
    if (criteria(item) in list) {
      list[criteria(item)] = [...list[criteria(item)], item];
    } else {
      list[criteria(item)] = [item];
    }
  });

  return Object.keys(list).map((section) => {
    return {title: naming ? naming(section) : section, data: list[section]};
  });
};

export const isSameHourAndMinute = (o1: string, o2: string) => {
  return (
    moment(o1).format('YYYY-MM-DD HH:mm') ===
    moment(o2).format('YYYY-MM-DD HH:mm')
  );
};
