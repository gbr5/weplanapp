import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  z-index: 50;
  top: 30%;
  left: 2%;
  height: 40%;
  width: 96%;
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text5};
  border-radius: 16px;
`;

export const Question = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;
