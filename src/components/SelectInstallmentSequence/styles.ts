import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  border-radius: 5px;;
  padding: 16px;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.color.text5};
  margin: 56px 0 24px;
  position: absolute;
  z-index: 35;
  top: 5%;
  left: 1%;
  height: 50%;
  width: 108%;
`;

export const SequenceButton = styled.TouchableOpacity<IProps>`
  border-radius: 5px;
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme.color.primary
      : theme.color.text2
  };
  padding: 16px;
  margin: 8px;
  align-items: center;
`;

export const ButtonTitle = styled.Text<IProps>`
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.color.text1
      : theme.color.text6
  };
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
