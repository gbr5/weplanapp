import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.text2};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: 24px;
  margin: 8px 8px 4px 0;
  letter-spacing: 1px;
`;

export const Date = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 20px;
  padding: 4px;
  text-align: right;
  letter-spacing: 1px;
`;
