import React from 'react';
import ProfileButton from '../ProfileButton';
import BackButton from '../BackButton';

import { Container } from './styles';
import theme from '../../global/styles/theme';

interface IProps {
  unsetVariables?: () => void;
}

const PageHeader: React.FC<IProps> = ({ unsetVariables, children }) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
    >
      <BackButton unsetVariables={unsetVariables} />
        {children}
      <ProfileButton />
    </Container>
  );
}

export default PageHeader;
