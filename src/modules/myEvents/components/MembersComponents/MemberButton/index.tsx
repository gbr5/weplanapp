import React, { useState, useEffect } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

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
  const { selectedMember, selectMember} = useMyEvent();

  const [memberBody, setMemberBody] = useState(false);

  function handleMemberBody() {
    memberBody
      ? selectMember({} as IEventMemberDTO)
      : selectMember(member);
    setMemberBody(!memberBody);
  }

  useEffect(() => {
    selectedMember
      && selectedMember.id
      && selectedMember.id === member.id
        ? (
          setMemberBody(true)
        ) : (
          setMemberBody(false)
        )
  }, [selectedMember]);

  return (
    <>
      <Container isActive={selectedMember.id === member.id} onPress={handleMemberBody}>
        <Index>{index}</Index>
        <Name>{member.userEventMember.name}</Name>
        {memberBody ? (
          <Icon name="chevron-up" />
        ) : (
          <Icon name="chevron-down" />
        )}
      </Container>
      {memberBody
        && selectedMember
        && selectedMember.id
        && selectedMember.id === member.id && (
          <MemberButtonInfo />
        )}
    </>
  );
}
