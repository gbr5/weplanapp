import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 4px;
  border: 0.5px solid ${({ theme }) => theme.color.text3};
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

export const UnderlineTitle = styled.View`
  height: 2px;
  width: 100%;
  margin-top: 4px;
  background-color: ${({ theme }) => theme.color.primary_light};
`;

export const EditTitleIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(20)}px;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.color.text2};
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;


export const ArrowIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(20)}px;
`;

export const ArrowButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text3};
  padding: 4px;
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  width: 32px;
  height: 32px;
`;

export const TaskLabel = styled.Text`
  position: absolute;
  top: 0;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
