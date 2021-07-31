import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

interface IMenuButtonProps {
  isActive: boolean;
}

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
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  margin-top: 8px;
`;

export const FirstSection = styled.View`
  width: 100%;
  margin-top: 8px;
  height: 60.7%;
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
  margin-top: 4px;
`;

export const MenuButton = styled(BorderlessButton)<IMenuButtonProps>`
  flex-direction: row;
  width: 180px;
  height: 56px;
  border-radius: 5px;
  background-color: ${({ theme, isActive }) => isActive
    ? theme.color.primary
    : theme.color.secondary
  };
  margin: 0 8px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const ButtonTitle = styled.Text<IMenuButtonProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme, isActive }) => isActive
    ? theme.color.secondary
    : theme.color.text6
  };
  text-align: center;
  line-height: 26px;
`;

export const MenuIcon = styled(Feather)<IMenuButtonProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.primary
  };
  margin-left: 8px;
`;
