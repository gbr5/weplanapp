import styled from 'styled-components/native';
import { FlatList, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  position: relative;
  flex: 1;
  padding-bottom: ${Platform.OS === 'android' ? '0px' : `${getBottomSpace()}px`};
`;

export const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  text-align: center;
  margin: 8px 0;
`;

export const AddButton = styled.TouchableOpacity`
  position: absolute;
  right: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 4px;
`;

export const AddIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(32)}px;
`;

export const TasksContainer = styled(
  FlatList as new () => FlatList<IEventTaskDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 80,
  },
})`
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
  padding: 2px;
  padding-bottom: 32px;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;
