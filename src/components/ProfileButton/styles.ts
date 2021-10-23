import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 16px;
  background-color: rgba(200,200,200,0.1);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
`;

export const UserAvatar = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: 8px;
`;
