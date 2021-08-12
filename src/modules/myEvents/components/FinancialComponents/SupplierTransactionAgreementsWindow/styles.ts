import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  width: 100%;
  margin-top: 40px;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
`;

export const AgreementsContainer = styled(
  FlatList as new () => FlatList<IEventSupplierTransactionAgreementDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  border-radius: 16px;
  width: 100%;
  flex: 1;
  max-height: 90%;
  padding: 2px;
`;
