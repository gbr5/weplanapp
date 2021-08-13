import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 16px;
  background-color: ${({ theme }) => theme.color.text5};
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
`;
