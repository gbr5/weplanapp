import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
`;

export const TitleButton = styled(BorderlessButton)`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  margin: 0px 0 16px;
`;

export const FirstSection = styled.View`
  width: 100%;
`;

export const BudgetSection = styled(BorderlessButton)`
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.primary};
  align-items: center;
  justify-content: center;
`;

export const BudgetTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  margin-bottom: 6px;
`;

export const BudgetValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const Resume = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 8px;
  margin-top: 16px;
  padding: 8px;
`;

export const PercentageUnderline = styled.View`
  background-color: ${({ theme }) => theme.color.text2};
  height: 1px;
  width: 100%;
  margin-bottom: 8px;
`;

export const ResumeTitle = styled.Text`
  width: 100%;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  margin-bottom: 8px;
  `;

export const ResumeUnderline = styled.View`
  background-color: ${({ theme }) => theme.color.text3};
  height: 1px;
  width: 100%;
  margin-bottom: 8px;
  `;

export const ResumeValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  `;

export const SectionButton = styled.ScrollView`
  width: 100%;
  padding: 8px;
  padding-right: 18px;
  margin-top: 16px;
`;

export const MenuButton = styled(BorderlessButton)`
  width: 160px;
  height: 104px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
  margin: 0 8px;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text6};
  text-align: center;
  line-height: 26px;
  margin-bottom: 8px;
`;

export const MenuIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.primary};
`;
