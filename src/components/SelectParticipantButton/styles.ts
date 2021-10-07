import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IProps {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<IProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.color.text6};
  ${({ isSelected }) => isSelected && css`
    border: 0.5px solid ${({ theme }) => theme.color.primary};
  `}
  /* background-color: ${({ theme }) => theme.color.primary}; */
  /* ${({ isSelected }) => isSelected && css` */
  background-color: ${({ theme }) => theme.color.text6};
  /* `} */
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 5px;
  margin: 4px 0;
  flex-direction: row;
  z-index: 2;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  flex: 1;
  text-align: left;
  margin-top: 16px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(12)}px;
  position: absolute;
  top: 4px;
  left: 8px;
`;

export const FriendButton = styled.TouchableOpacity<IProps>`
  background-color: ${({ theme }) => theme.color.text6};
  /* ${({ isSelected }) => isSelected && css`
    background-color: ${({ theme }) => theme.color.primary};
  `} */
  padding: 4px;
  border: 0.3px solid ${({ isSelected, theme }) => isSelected ? theme.color.primary : theme.color.text4};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 4px;
`;
