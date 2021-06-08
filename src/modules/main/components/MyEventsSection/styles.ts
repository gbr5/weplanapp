import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/Feather';
import { theme } from '../../../../global';

export const Container = styled.View`
  width: 100%;
  padding: 5px;
  background-color: ${theme.InfoBackgroundColor};
  border-radius: 8px;
  position: relative;
`;

export const NextEvent = styled.View`
  flex-direction: column;
`;

export const TitleSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  paddingVertical: 24px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
  margin-right: 12px;
`;

export const AddEventButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  margin-left: 12px;
`;

export const AddIcon = styled(Icons)`
  background-color: ${theme.PrimaryColor};
  color: ${theme.TextColor1};
  border-radius: 50px;
`;

export const NextEventName = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;
export const NextEventDate = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;

export const NextEventConfirmed = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;

export const NextEventNotConfirmed = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;
