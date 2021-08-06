import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text5};
  border-radius: 8px;
  height: 38px;
  width: 38px;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;
