import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IBackgroundColor {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  padding: 0 16px 16px;
  top: -16px;
`;

export const Menu = styled.ScrollView`
  width: 100%;
  margin: 7px 4px 0;
`;

export const MenuButton = styled.TouchableOpacity`
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 108px;
  /* border: 1px solid ${({ theme }) => theme.color.title}; */
  margin-right: 16px;
`;

export const MenuText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text6};
  margin-top: 4px;
`;

export const MenuTitle = styled.Text`
  margin-bottom: 8px;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
`;

export const IconContainer = styled.View<IBackgroundColor>`
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 20px;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 72px;
`;

export const FunctionIcon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.color.text6};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  letter-spacing: 1px;
`;

export const DateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
  border: 0.5px solid ${({ theme}) => theme.color.text3};
  border-radius: 5px;
  width: 40%;
`;

export const TaskTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 104px;
`;

export const TaskHeader = styled.Text`
  position: absolute;
  top: 2px;
  left: 4px;

  color: ${({ theme }) => theme.color.text5};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
`;

export const TaskTitle = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  letter-spacing: 1px;

`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 80px;
`;

export const DateHeader = styled.Text`
  position: absolute;
  top: 2px;
  left: 4px;

  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
`;

export const NumberOfNotesContainer = styled.View`
  border-radius: 80px;
  padding: 4px;
  position: absolute;
  background-color: ${({ theme }) => theme.color.atention};
  top: -0px;
  left: -10px;
  z-index: 3;
  min-width: 38px;
  min-height: 38px;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const NumberOfNotes = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
