import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import IEventOwnerDTO from '../../../../dtos/IEventOwnerDTO';

export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.color.secondary};
  border-radius: 8px;
  padding: 8px;
  margin: 16px 0;
  min-height: 80px;
`;

export const SectionButton = styled(BorderlessButton)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  /* padding-right: 8px; */
`;

export const Label = styled.Text`
  /* width: 100%; */
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  letter-spacing: 1px;
`;

export const LabelUnderline = styled.View`
  width: 80%;
  height: 1px;
  margin-left: 0;
  background-color: ${({ theme }) => theme.color.text6};
`;

export const EventContainer = styled(
  FlatList as new () => FlatList<IEventOwnerDTO>,
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
