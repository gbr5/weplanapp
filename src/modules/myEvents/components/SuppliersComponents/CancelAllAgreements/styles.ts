import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

interface IProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  margin: 40px 0 0;
  width: 100%;
`;

export const TransactionTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const TransactionTitleButton = styled.TouchableOpacity<IProps>`
  background-color: ${({ theme, isActive }) => isActive
    ? theme.color.primary
    : theme.color.secondary
  };
  border-radius: 8px;
  padding: 8px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
`;

export const TransactionTitleText = styled.Text<IProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.primary
  };
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  letter-spacing: 1px;
  text-align: justify;
`;

export const AgreementsContainer = styled.ScrollView`
  width: 100%;
  background: ${({ theme }) => theme.color.text5};
  border-radius: 8px;
  padding: 8px 0;
  margin: 4px 0 8px;
  max-height: 100px;
  padding-right: 16px;
`;

export const AgreementContainer = styled.TouchableOpacity<IProps>`
  background-color: ${({ theme, isActive }) => isActive
    ? theme.color.primary
    : theme.color.secondary
  };
  border-radius: 8px;
  padding: 0 16px;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
`;

export const AgreementButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AgreementIndex = styled.Text<IProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text2
    : theme.color.text6
  };
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  position: absolute;
  top: 0px;
  left: 4px;
`;

export const AgreementDate = styled.Text<IProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.primary
  };
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
`;

export const AgreementValue = styled.Text<IProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.primary
  };
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
  margin: 0 auto;
`;

export const NumberOfInstallments = styled.Text<IProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.primary
  };
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
  margin-left: 8px;
`;


export const SectionUnderline = styled.View`
  width: 80%;
  height: 1.3px;
  margin: 0 auto 16px;
  background-color: ${({ theme }) => theme.color.text2};
`;

export const TransactionsContainer = styled(
  FlatList as new () => FlatList<ITransactionDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  border-radius: 8px;
  width: 100%;
  height: 240px;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;
