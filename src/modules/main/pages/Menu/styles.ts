import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 120px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  border-radius: 10px;
  height: 64px;
  width: 64%;
  margin-top: 16px;
`;

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.text6};
`;
