import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  height: 100%;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: 24px;
`;

export const FormQuestion = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: 20px;
`;
