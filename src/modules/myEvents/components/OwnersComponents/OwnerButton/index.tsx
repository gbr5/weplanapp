import React, { useState, useEffect } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import IEventOwnerDTO from '../../../../../dtos/IEventOwnerDTO';

import { OwnerButtonInfo } from '../OwnerButtonInfo';

import {
  Container,
  Index,
  Name,
  Icon,
} from './styles';

interface IProps {
  owner: IEventOwnerDTO;
  index: string;
}

export function OwnerButton({
  owner,
  index,
}: IProps) {
  const { selectedOwner, selectOwner} = useMyEvent();

  const [ownerBody, setOwnerBody] = useState(false);

  function handleOwnerBody() {
    ownerBody
      ? selectOwner({} as IEventOwnerDTO)
      : selectOwner(owner);
    setOwnerBody(!ownerBody);
  }

  useEffect(() => {
    selectedOwner
      && selectedOwner.id
      && selectedOwner.id === owner.id
        ? (
          setOwnerBody(true)
        ) : (
          setOwnerBody(false)
        )
  }, [selectedOwner]);

  return (
    <>
      <Container onPress={handleOwnerBody} isActive={selectedOwner.id === owner.id}>
        <Index>{index}</Index>
        <Name>{owner.userEventOwner.name}</Name>
        {ownerBody ? (
          <Icon name="chevron-up" />
        ) : (
          <Icon name="chevron-down" />
        )}
      </Container>
      {ownerBody
        && selectedOwner
        && selectedOwner.id
        && selectedOwner.id === owner.id && (
          <OwnerButtonInfo />
        )}
    </>
  );
}
