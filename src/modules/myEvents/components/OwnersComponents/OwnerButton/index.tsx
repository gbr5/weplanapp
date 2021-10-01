import React, { useState, useEffect } from 'react';

import IEventOwnerDTO from '../../../../../dtos/IEventOwnerDTO';
import theme from '../../../../../global/styles/theme';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';

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
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const { selectedEventOwner, selectEventOwner} = useEventVariables();
  const { getSelectedUserEventTasks } = useMyEvent();

  const [ownerBody, setOwnerBody] = useState(false);

  async function handleOwnerBody() {
    if (ownerBody) {
      selectEventOwner({} as IEventOwnerDTO)
    } else {
      await getSelectedUserEventTasks(owner.userEventOwner.id);
      selectEventOwner(owner);
    }
    setOwnerBody(!ownerBody);
  }

  useEffect(() => {
    selectedEventOwner
      && selectedEventOwner.id
      && selectedEventOwner.id === owner.id
        ? (
          setOwnerBody(true)
        ) : (
          setOwnerBody(false)
        )
  }, [selectedEventOwner]);

  return (
    <>
      <Container
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 8,
        }}
        onPress={handleOwnerBody}
        isActive={selectedEventOwner.id === owner.id}
      >
        <Index>{index}</Index>
        <Name>{owner.userEventOwner.name}</Name>
        {ownerBody ? (
          <Icon name="chevron-up" />
        ) : (
          <Icon name="chevron-down" />
        )}
      </Container>
      {ownerBody
        && selectedEventOwner
        && selectedEventOwner.id
        && selectedEventOwner.id === owner.id && (
          <OwnerButtonInfo />
        )}
    </>
  );
}
