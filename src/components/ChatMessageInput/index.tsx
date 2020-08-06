import React, {useState} from 'react';
import {TextInput, TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {IMessage} from '../../services/models';
import SendIcon from '../../assets/send-icon.png'
import SendSelectedIcon from '../../assets/send-icon-selected.png'

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
    <View style={[styles.inputContainerStyle]}>
      <View style={styles.inputStyle}>
      <TextInput
        style={styles.inputText}
        placeholder="Digite sua mensagem"
        multiline={true}
        blurOnSubmit={false}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={_onSubmit} style={styles.inputButton}>
        <Image source={message.length > 0 ? SendSelectedIcon: SendIcon}  style={styles.inputButtonImage}/>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  inputContainerStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems:'center',
    
  },
  inputStyle:{
    backgroundColor:'#F7F7F7',
    borderRadius: 26,
    justifyContent: 'flex-start',
    margin: 16,
    marginTop:8,
    marginBottom:8,
    flex: 1,
    flexDirection: 'row',
    alignItems:'flex-start'
  },
  inputText:{
    margin: 11,
    marginLeft: 22,
    fontSize: 18,
    flex: 1
  }, 
  inputButton:{
    alignSelf: 'flex-end'
  },
  inputButtonImage:{
    width: 22,
    height:22, 
    margin: 16,
    marginLeft: 4,
    alignSelf: 'flex-end'
  }
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
