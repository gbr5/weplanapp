import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  marginVertical: 16px
  align-items: center;
`;
export const ContactContainer = styled.ScrollView`
  padding: 8px;
  marginVertical: 8px;
  width: 100%;
`;
export const Title = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  color: ${theme.TextColor1};
  text-align: center;
  font-size: 24px;
`;
export const TitleBorderBottom = styled.View`
  background-color: ${theme.PrimaryColor};
  height: 2px;
  width: 80%;
`;

export const AddContactButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${theme.PrimaryColor};
  border: 0.5px solid ${theme.SecondaryColor};
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
`;
