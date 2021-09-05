import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IBackgroundColor {
  color: string;
}

export const Container = styled.View`
  z-index: 2;
  /* top: 40px; */
  width: 100%;
  background-color: ${({ theme }) => theme.color.text6};
  margin: 0 auto 8px;
  border-radius: 8px;
  padding: 8px;
  padding-top: 18px;
`;

export const DateText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text4};
  letter-spacing: 1.5px;
`;

export const IconContainer = styled.View<IBackgroundColor>`
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  border: none;
  position: relative;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px 16px 0;
`;

export const MenuButtonSection = styled.ScrollView`
  position: relative;
  margin: 7px 4px 0;
  padding-left: 16px;
`;

export const MenuButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  min-height: 112px;
  border: none;
  margin-right: 16px;
`;

export const Name = styled.Text`
  margin-top: 12px;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const Contact = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const MenuText = styled.Text`
  margin-bottom: 12px;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const SectionBorder = styled.View`
  width: 100%;
  min-height: 1px;
  background-color: ${({ theme }) => theme.color.text4};
  /* margin: 8px 0; */
`;

export const FieldLabel = styled.Text`
  position: absolute;
  top: 4px;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
`;

export const FieldContainer = styled.View`
  position: relative;
  width: 99%;
  align-items: center;
  justify-content: space-around;
  margin: 8px 0;
  padding: 0 16px;
  padding-top: 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  margin: 4px;
  min-height: 80px;
`;

export const FieldButton = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  width: 99%;
  align-items: center;
  justify-content: space-around;
  margin: 8px 0;
  padding: 0 8px;
  padding-top: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  margin: 4px;
  border: none;
  min-height: 60px;
`;

export const ConfirmGuestButton = styled.TouchableOpacity`
  border: none;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;
