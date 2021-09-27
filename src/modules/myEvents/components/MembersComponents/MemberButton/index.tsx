import React, { useState, useEffect } from 'react';

import { useEventVariables } from '../../../../../hooks/eventVariables';
import IEventMemberDTO from '../../../../../dtos/IEventMemberDTO';

import { MemberButtonInfo } from '../MemberButtonInfo';

import {
  Container,
  Index,
  Name,
  Icon,
} from './styles';

interface IProps {
  member: IEventMemberDTO;
  index: string;
}

export function MemberButton({
  member,
  index,
}: IProps) {
  const { selectedEventMember, selectEventMember} = useEventVariables();

  const [memberBody, setMemberBody] = useState(false);

  function handleMemberBody() {
    memberBody
      ? selectEventMember({} as IEventMemberDTO)
      : selectEventMember(member);
    setMemberBody(!memberBody);
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
      <Container isActive={selectedEventMember.id === member.id} onPress={handleMemberBody}>
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
