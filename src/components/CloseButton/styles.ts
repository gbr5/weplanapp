import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transform: rotateZ(45deg);
  padding: 4px;
  align-items: center;
  justify-content: center;
`;
