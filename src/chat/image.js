import React from 'react';
import {Image, Modal, View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ImageViewer} from 'react-native-image-zoom-viewer';

const ChatImageViewer = ({visible, url, onClose}) => {
  if (!visible) {
    return null;
  }
  return (
    <Modal visible={visible} transparent animated>
      <ImageViewer imageUrls={[{url}]} enableSwipeDown onSwipeDown={onClose} />
    </Modal>
  );
};

export default ChatImageViewer;
