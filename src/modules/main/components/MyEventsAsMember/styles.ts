import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.color.text3};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 32px;
  min-height: 80px;
`;

export const Label = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 18px;
  padding-left: 8px;
  letter-spacing: 1px;
`;

export const LabelUnderline = styled.View`
  width: 80%;
  height: 1px;
  margin-left: 0;
  background-color: ${({ theme }) => theme.color.text6};
`;

export const EventContainer = styled.ScrollView`
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
  background: ${({ theme }) => theme.color.text5};
  height: 240px;
`;

export const EventButton = styled.TouchableOpacity`
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.text2};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: 24px;
  margin: 8px 8px 8px 0;
  letter-spacing: 1px;
`;

export const Date = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 22px;
  padding: 8px;
  text-align: right;
  letter-spacing: 1px;
`;
