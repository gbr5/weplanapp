import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  margin: 16px 0;
  align-items: center;
`;
export const ContactContainer = styled.ScrollView`
  padding: 8px;
  margin: 8px 0;
  width: 100%;
`;
export const Title = styled.Text`
  color: ${theme.color.text1};
  font-family: ${theme.fonts.roboto_medium};
  text-align: center;
  font-size: 24px;
`;
export const TitleBorderBottom = styled.View`
  background-color: ${theme.color.primary};
  height: 2px;
  width: 80%;
`;
export const AddContactButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${theme.color.primary};
  border: 0.5px solid ${theme.color.secondary};
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
`;
