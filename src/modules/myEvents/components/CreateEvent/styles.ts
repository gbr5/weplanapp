import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  flex-direction: column;
  background-color: ${theme.color.text3};
  width: 90%;
  height: 88%;
  border-radius: 16px;
  padding: 8px;
  margin: 16px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.color.text1};
  font-family: ${theme.fonts.roboto_medium};
  margin-right: 12px;
`;

export const EventName = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.color.text1};
  font-family: ${theme.fonts.roboto_medium};
  margin-right: 12px;
`;
