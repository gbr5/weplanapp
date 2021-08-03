import React from 'react';
import ProfileButton from '../ProfileButton';
import BackButton from '../BackButton';

import { Container } from './styles';

interface IProps {
  unsetVariables?: () => void;
}

const PageHeader: React.FC<IProps> = ({ unsetVariables, children }) => (
  <Container>
    <BackButton unsetVariables={unsetVariables} />
      {children}
    <ProfileButton />
  </Container>
);

export default PageHeader;
