import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  width: 100%;
  background: ${theme.color.text2};
  border-radius: 8px;
  padding: 8px;
`;

export const Label = styled.Text`
  width: 100%;
  color: ${theme.color.primary};
  letter-spacing: 1px;
  font-size: 18px;
  padding-left: 8px;
`;

export const LabelUnderline = styled.View`
  width: 50%;
  height: 1px;
  margin-left: 0;
  background-color: ${theme.color.text6};
`;

export const Name = styled.Text`
  width: 100%;
  color: ${theme.color.text1};
  font-family: ${theme.fonts.roboto_medium};
  font-size: 28px;
  text-align: center;
  margin: 20px 0 12px;
  letter-spacing: 1.5px;
`;

export const Date = styled.Text`
  width: 100%;
  color: ${theme.color.text6};
  font-family: ${theme.fonts.roboto};
  font-size: 22px;
  padding: 8px;
  text-align: right;
  letter-spacing: 1px;
`;
