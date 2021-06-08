import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/Feather';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex-direction: column;
  position: absolute;
  z-index: 2;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
  background-color: ${theme.SecondaryColor};
  top: 5%;
  left: 5%;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.TextColor5};
  font-family: 'RobotoSlab-Medium';
  margin-right: 12px;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  margin-left: 12px;
  position: absolute;
  top: 5%;
  right: 5%;
`;

export const CloseIcon = styled(Icons)`
  background-color: ${theme.PrimaryColor};
  color: ${theme.TextColor1};
  border-radius: 50px;
`;
