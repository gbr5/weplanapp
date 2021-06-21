import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 80px;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 8px;
  padding: 0 16px;
  margin: 8px 0;
`;

export const ContactType = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};

  letter-spacing: 2px;
`;

export const ContactInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: 24px;
  color: ${({ theme }) => theme.color.text5};
  letter-spacing: 1px;
  text-align: right;
`;
