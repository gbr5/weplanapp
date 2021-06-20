import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.TouchableOpacity`
  height: 80px;
  justify-content: center;
  background-color: ${theme.color.secondary};
  border-radius: 8px;
  padding: 0 16px;
  margin: 8px 0;
`;

export const ContactType = styled.Text`
  font-size: 18px;
  color: ${theme.color.primary};
  font-family: ${theme.fonts.roboto_medium};

  letter-spacing: 2px;
`;

export const ContactInfo = styled.Text`
  font-family: ${theme.fonts.roboto_medium};
  font-size: 24px;
  color: ${theme.color.text5};
  letter-spacing: 1px;
  text-align: right;
`;
