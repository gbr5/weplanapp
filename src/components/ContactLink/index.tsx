import React, { useMemo } from 'react';
import { Linking } from 'react-native';

import { Container, Title } from './styles';

interface IProps {
  contact: string;
  type: string;
}

export function ContactLink({ contact, type }: IProps) {

  function makeCall() {
    if (type === 'Phone') return Linking.openURL(`tel:${contact}`);
    if (type === 'Whatsapp')
      return Linking.openURL(`whatsapp://send?phone=${contact}`);
    if (type === 'Email') return Linking.openURL(`mailto:${contact}`);
    if (type === 'Address')
      return Linking.openURL(`https://maps.google.com/?q=${contact}`);
    return Linking.openURL(`${contact}`)
  }

  const variables = useMemo(() => {
    if (type === 'Phone') return {
      color: 'rgba(10, 150, 250, 0.2)',
      title: 'Ligar',
    };
    if (type === 'Whatsapp') return {
      color: 'rgba(10, 150, 50, 0.2)',
      title: 'Acessar'
    };
    if (type === 'Email') return {
      color: 'rgba(150, 50, 50, 0.2)',
      title: 'Acessar'
    };
    return {
      color: 'rgba(50, 50, 50, 0.2)',
      title: 'Acessar'
    };
  }, [type]);

  return (
    <Container
      style={{
        backgroundColor: variables.color,
      }}
      onPress={makeCall}
    >
      <Title>{variables.title}</Title>
    </Container>
  );
}
