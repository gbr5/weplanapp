import React from 'react';
import { ContactLink } from '../../components/ContactLink';
import IUserContactDTO from '../../dtos/IUserContactDTO';
import { useFriends } from '../../hooks/friends';
import WindowContainer from '../WindowContainer';

export function WPFriendContactWindow(): JSX.Element {
  const { handleSelectedUserContact, selectedUserContact } = useFriends();

  function closeWindow() {
    handleSelectedUserContact({} as IUserContactDTO);
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={51}
      top="30%"
      left="5%"
      height="40%"
      width="90%"
    >
      <ContactLink
        type={selectedUserContact.contact_type}
        contact={selectedUserContact.contact_info}
      />
    </WindowContainer>
  );
};

