import styled from 'styled-components/native';

import { theme } from '../../global';

export const Container = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${theme.RedBackgroundColor};
  border-radius: 16px;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  transform: rotateZ(45deg);
`;
