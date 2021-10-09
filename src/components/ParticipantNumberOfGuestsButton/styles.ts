import styled from 'styled-components/native';
// import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  border: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  text-align: center;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
  text-align: center;
`;

export const NumberOfGuest = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
  padding: 4px;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 4px;
  border: none;
  align-items: center;
  justify-content: space-between;
`;
// export const NumberOfGuest = styled(Feather)``;
