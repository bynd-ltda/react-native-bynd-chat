import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {colors} from '../../styles';
import {
  fontFamilyMedium,
  fontFamilyRegular,
  Gray600,
  Subtitle1,
  Subtitle2,
} from '../components/Typography';

const {width, height} = Dimensions.get('window');

export const Container = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  background-color: white;
  margin: 8px;
`;

export const Wrapper = styled.View`
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20%;
`;

export const BackButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

export const HeaderLeft = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
`;

export const Sep = styled.View`
  margin-left: 37px;
  margin-right: 37px;
  width: 100%;
  height: 1px;
  background-color: #efefef;
`;
export const LoadingView = styled.View`
  flex: 1;
  align-items: center;
  padding: 16px;
`;

export const ChatTitle = styled.Text`
  font-family: ${fontFamilyMedium};
  font-size: 16px;
  letter-spacing: 0.4px;
  color: ${Gray600};
`;

export const ChatSubtitle = styled.Text`
  font-family: ${fontFamilyRegular};
  font-size: 14px;
  letter-spacing: 1.5px;
  color: ${Gray600};
`;

export const Badge = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${colors.primary};
  border-radius: 12px;
  color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const BadgeText = styled(ChatSubtitle)`
  color: white;
`;
export const InfoContainer = styled.View`
  justify-content: space-between;
  margin: 8px;
`;
export const Time = styled(ChatSubtitle)``;
export const TrailContainer = styled.View`
  margin: 8px;
  align-self: flex-end;
`;
export const UserPhoto = styled.Image`
  width: 48px;
  height: 48px;
`;

export const UserPhotoContainer = styled.View``;

export const UserDetailContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const UserTitle = styled(ChatTitle)`
  color: black;
  padding-left: 8px;
`;

export const UserWrapper = styled.View`
  background-color: ${colors.primary};
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const UserContainer = styled.SafeAreaView`
  background-color: ${colors.primary};
  padding: 8px;
  flex-direction: row;
  align-items: center;
`;

export const BackgroundColor = styled.View`
  flex: 1;
  ${props => `background-color: ${props.color};`}
`;

export const shadowInput = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 0},
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
};

export const shadowHeader = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
};

export const TextInput = styled.TextInput`
  font-family: ${fontFamilyRegular};
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  margin-left: 8px;
  margin-right: 8px;
  background-color: #fdfdfd;
`;

export const SendContainer = styled.View`
  flex-direction: row;
  padding-top: 0px;
`;

export const TopBorder = styled.View`
  border-top-width: 1px;
  border-color: #dddddd;
`;

export const InputContainer = styled.View`
  padding-bottom: 4px;
  flex: 1;
`;

export const InputButton = styled.TouchableOpacity`
  background-color: white;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const ImageButton = styled.TouchableOpacity`
  background-color: white;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-right: -5px;
`;

export const BubbleContainer = styled.View`
  margin-top: 8px;
  margin-right: 22px;
  margin-left: 22px;
  margin-bottom: 8px;
  ${props =>
    props.isLeft ? 'align-self: flex-start;' : 'align-self: flex-end;'}
`;

export const BubbleWrapper = styled.View`
  padding: 16px;
  flex-direction: column;
  border-radius: 24px;
  ${props =>
    props.isLeft
      ? `background-color: ${colors.primaryBubble};`
      : 'background-color: #efefef;'}
  ${props =>
    props.isLeft
      ? 'border-bottom-left-radius: 0px'
      : 'border-bottom-right-radius: 0px'};
`;

export const FavouriteView = styled.View`
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const FavouriteRadius = styled.View`
  border-radius: 16px;
  background-color: #e8e8e8;
  padding: 4px;
  margin: 4px;
`;

export const FavouriteText = styled.Text`
  color: #555555;
  font-size: 10px;
`;

export const BubbleImage = styled.Image`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  border-radius: 8px;
`;

export const BubbleContent = styled(Subtitle2)`
  ${props => (props.isLeft ? 'color: #5B5B5B;' : 'color: black;')}
`;

export const BubbleTimestamp = styled.Text`
  color: black;
  padding-top: 8px;
  font-size: 10px;
  opacity: 0.5;
  ${props =>
    props.isLeft ? 'align-self: flex-start;' : 'align-self: flex-end;'}
`;

export const BubbleTimestampContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;
