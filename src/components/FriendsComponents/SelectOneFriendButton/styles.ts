import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IProps {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<IProps>`
  border-radius: 5px;
  border: none;
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${({ theme }) => theme.color.primary};
        `
      : css`
          background-color: ${({ theme }) => theme.color.text6};
        `};
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-top: 4px;
  margin: 4px;
`;

const imageSize = 40;

export const Avatar = styled.Image`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: left;
`;
