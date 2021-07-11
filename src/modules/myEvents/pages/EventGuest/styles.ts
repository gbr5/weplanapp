import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(32)}px;
  text-align: center;
  color: ${({ theme }) => theme.color.primary};
  margin-top: 16px;
`;

export const Body = styled.ScrollView`
  padding: 16px;
  background: ${({ theme }) => theme.color.background};
  flex: 1;
`;

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  margin-top: 16px;
`;

export const InfoLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  position: absolute;
  color: ${({ theme }) => theme.color.text5};
  top: 0px;
  left: 4px;
`;

export const InfoContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text3};
  width: 100%;
  flex-direction: row;
  padding: 8px 16px;
  min-height: 80px;
  margin: 8px 0;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
`;

interface IButtonProps {
  isConfirmed: boolean;
}

export const ConfirmationButton = styled.TouchableOpacity<IButtonProps>`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100%;
  height: 48px;
  margin: 8px 0;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  ${(props) => !props.isConfirmed
    && css`
      background-color: ${({ theme }) => theme.color.secondary};
    `}
`;

export const ConfirmationButtonText = styled.Text<IButtonProps>`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};

  ${(props) => !props.isConfirmed
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;
