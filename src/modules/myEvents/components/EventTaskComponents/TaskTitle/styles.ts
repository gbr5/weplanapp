import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  border: 0.19px solid ${({ theme }) => theme.color.text3};
  margin-top: 36px;
`;

export const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  letter-spacing: 1px;
  width: 100%;
  text-align: center;
  margin-right: 4px;
  margin-top: 24px;
`;

export const TaskLabel = styled.Text`
  position: absolute;
  top: 0;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
