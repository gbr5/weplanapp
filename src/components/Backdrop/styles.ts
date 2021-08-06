import styled from 'styled-components/native';


interface IProps {
  zIndex: number;
}

export const Container = styled.TouchableOpacity<IProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  z-index: ${({ zIndex }) => zIndex ? zIndex : 2};
  background-color: rgba(0,0,0,0.5);
`;
