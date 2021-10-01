import React, { useState } from 'react';
import { ContactLink } from '../../components/ContactLink';
import IUserContactDTO from '../../dtos/IUserContactDTO';
import theme from '../../global/styles/theme';
import WindowContainer from '../WindowContainer';

import { ContactInfo, Container, ContainerButton, ContactType } from './styles';

interface IProps {
  contact: IUserContactDTO;
  goToContact: () => void;
}

export function WPFriendContact({ contact, goToContact }: IProps): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  return (
    <ContainerButton
      style={{
        elevation: 5,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={goToContact}
    >
      <ContactType>{contact.contact_type}</ContactType>
      <ContactInfo>{contact.contact_info}</ContactInfo>
    </ContainerButton>
  );
};

