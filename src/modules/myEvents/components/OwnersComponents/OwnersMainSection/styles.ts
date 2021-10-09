import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { IParticipantWithGuests } from '../../../../../components/ParticipantNumberOfGuestsButton';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Body = styled.View`
  width: 100%;
  height: 64%;
`;

export const SubContainer = styled.View`
  margin: 8px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  margin: 8px 0;
  text-align: center;
`;

export const ParticipantsContainer = styled(
  FlatList as new () => FlatList<IParticipantWithGuests>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  width: 100%;
  padding: 8px 4px;
  flex: 1;
  max-height: 100%;
`;
