import React from 'react';
import ProfileButton from '../ProfileButton';
import BackButton from '../BackButton';

import { Container } from './styles';

const PageHeader: React.FC = ({ children }) => (
  <Container>
    <BackButton />
      {children}
    <ProfileButton />
  </Container>
);

export default PageHeader;
