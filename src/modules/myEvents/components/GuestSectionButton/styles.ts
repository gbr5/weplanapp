import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isMine: boolean;
}

export const Container = styled.View<IProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.text6};
  margin: 8px 0;
  min-height: 48px;
  border-radius: 8px;
  width: 100%;

  ${(props) => props.isMine
    && css`
      background-color: ${({ theme }) => theme.color.primary};
    `}
`;

export const GuestIndex = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.color.secondary};

  text-align: center;
  width: 24px;
  margin: 0 8px;
`;

export const GuestNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 85%;
`;

export const GuestName = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  text-align: left;

  color: ${({ theme }) => theme.color.text1};
`;

export const GoToGuestButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

export const GuestConfirmationButton = styled.TouchableOpacity`
  width: 10%;
`;
