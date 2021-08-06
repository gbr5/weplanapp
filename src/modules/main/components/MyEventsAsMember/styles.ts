import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import IEventMemberDTO from '../../../../dtos/IEventMemberDTO';

export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.color.text6};
  border: 1px solid ${({ theme }) => theme.color.text4};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 32px;
  min-height: 80px;
`;

export const SectionButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  /* padding-right: 8px; */
`;

export const Label = styled.Text`
  /* width: 100%; */
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  letter-spacing: 1px;
`;

export const LabelUnderline = styled.View`
  width: 80%;
  height: 1.8px;
  margin-left: 0;
  background-color: ${({ theme }) => theme.color.title};
`;

export const EventContainer = styled(
  FlatList as new () => FlatList<IEventMemberDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
  background: ${({ theme }) => theme.color.text5};
  height: 240px;
`;
