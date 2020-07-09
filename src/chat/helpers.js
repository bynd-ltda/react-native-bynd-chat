export const decode = text => {
  try {
    return decodeURI(text);
  } catch (e) {
    return text;
  }
};

export const encode = text => {
  try {
    return encodeURI(text);
  } catch (e) {
    return text;
  }
};
