import React, { useState, useEffect, useMemo } from 'react';

import { useEventVariables } from '../../../../../hooks/eventVariables';
import IEventMemberDTO from '../../../../../dtos/IEventMemberDTO';

import { MemberButtonInfo } from '../MemberButtonInfo';

import {
  Container,
  Index,
  Name,
  Icon,
} from './styles';
import { useMyEvent } from '../../../../../hooks/myEvent';
import theme from '../../../../../global/styles/theme';
import { useAuth } from '../../../../../hooks/auth';

interface IProps {
  member: IEventMemberDTO;
  index: string;
}

export function MemberButton({
  member,
  index,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const { selectedEventMember, selectEventMember, isOwner} = useEventVariables();
  const { getSelectedUserEventTasks } = useMyEvent();

  const [memberBody, setMemberBody] = useState(false);

  const isAllowed = useMemo(() => {
    if (isOwner || selectedEventMember && selectedEventMember.id && (user.id === selectedEventMember.userEventMember.id))
      return true;
    return false;
  }, [isOwner, user, selectedEventMember]);

  async function handleMemberBody() {
    if (isAllowed) {
      if (memberBody) {
        selectEventMember({} as IEventMemberDTO)
      } else {
        await getSelectedUserEventTasks(member.userEventMember.id);
        selectEventMember(member);
      }
      setMemberBody(!memberBody);
    }
  }

  useEffect(() => {
    selectedEventMember
      && selectedEventMember.id
      && selectedEventMember.id === member.id
        ? (
          setMemberBody(true)
        ) : (
          setMemberBody(false)
        )
  }, [selectedEventMember]);

  return (
    <>
      <Container
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 5,
        }}
        isActive={selectedEventMember.id === member.id}
        onPress={handleMemberBody}
      >
        <Index>{index}</Index>
        <Name>{member.userEventMember.name}</Name>
        {memberBody ? (
          <Icon name="chevron-up" />
        ) : (
          <Icon name="chevron-down" />
        )}
      </Container>
      {memberBody
        && selectedEventMember
        && selectedEventMember.id
        && selectedEventMember.id === member.id && (
          <MemberButtonInfo />
        )}
    </>
  );
}
