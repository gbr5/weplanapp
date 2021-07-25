import styled, { css } from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface ISupplierProps {
  isHired: boolean;
}

interface IBackgroundColor {
  color: string;
}

export const Container = styled.View`
  top: -8px;
  z-index: -1;
  width: 99%;
  background-color: ${({ theme }) => theme.color.text6};
  margin: 0 auto 8px;
  border-radius: 8px;
  padding: 8px;
  /* border: 1.5px solid black; */
`;

export const GoToSupplierButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const SupplierName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  text-align: left;
  color: ${({ theme }) => theme.color.text1};
  margin: 8px 0;
  text-align: center;
`;

export const SupplierConfirmationButton = styled(BorderlessButton)<ISupplierProps>`
  width: 10%;
  color: ${({ theme }) => theme.color.atention};

  ${({ isHired }) => isHired && css`
    color: ${({ theme }) => theme.color.success};
  `};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const RowContainer = styled.View`
  width: 100%;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RowTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
`;

export const RedIcon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.atention};
`;

export const GreenIcon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.success};
`;

export const DateText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.secondary};
  letter-spacing: 1.5px;
`;

export const IconContainer = styled.View<IBackgroundColor>`
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  border: 2px solid black;
`;

export const NextTransactionContainer = styled.View`
  padding: 8px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px 16px 0;
`;

export const TransactionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const MenuButtonSection = styled.ScrollView`
  margin: 7px 4px 0;
`;

export const MenuButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.color.text5};
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  /* border: 1px solid ${({ theme }) => theme.color.secondary}; */
  margin-right: 16px;
`;

export const SectionTitle = styled.Text`
  margin-bottom: 4px;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
`;

export const TransactionText = styled.Text`
  margin-bottom: 4px;
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
`;

export const MenuText = styled.Text`
  margin-bottom: 12px;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
`;

export const SectionBorder = styled.View`
  width: 100%;
  min-height: 1px;
  background-color: ${({ theme }) => theme.color.secondary};
  /* margin: 8px 0; */
`;

export const SectionTitleLine = styled.View`
  width: 80%;
  min-height: 1.2px;
  background-color: ${({ theme }) => theme.color.primary};
  /* margin: 8px 0; */
`;

const iconSize = 32;

export const NotificationContainer = styled.View`
  position: absolute;
  top: -16px;
  left: -16px;
  border-radius: ${iconSize/2}px;
  height: ${iconSize}px;
  width: ${iconSize}px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.atention};
`;

export const NotificationNumber = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(iconSize/2)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
