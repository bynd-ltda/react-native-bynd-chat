import React, {useState} from 'react';
import {TextInput, TouchableOpacity, Text, View} from 'react-native';
import {IMessage} from '../../services/models';

interface ChatMessageInputProps {
  onSubmit(message: IMessage): void;
}

const ChatMessageInput: React.FC<ChatMessageInputProps> = (props) => {
  const [message, setMessage] = useState<string>('');

  const _onSubmit = () => {
    props.onSubmit && message.length > 0 && props.onSubmit({text: message});
    setMessage('');
  };
  return (
    <View>
      <TextInput
        style={styles.inputContainerStyle}
        placeholder="Digite sua mensagem"
        multiline={true}
        blurOnSubmit={false}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={_onSubmit}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  inputContainerStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

export default ChatMessageInput;

// <TopBorder>
//   <SendContainer>
//     <InputContainer>
//       <TextInput />
//     </InputContainer>
//     {pendingMsg.length === 0 && (
//       <>
//         <ImageButton onPress={onOpenCamera} style={shadowInput}>
//           <Icons name="camera" color="#2FC9D2" size={28} />
//         </ImageButton>
//         <ImageButton onPress={onImageSelect} style={shadowInput}>
//           <Icons name="image" color="#2FC9D2" size={28} />
//         </ImageButton>
//       </>
//     )}
//     <InputButton onPress={!submitting && onSubmit} style={shadowInput}>
//       <Icons name="send" color="#2FC9D2" size={28} />
//     </InputButton>
//   </SendContainer>
// </TopBorder>;
