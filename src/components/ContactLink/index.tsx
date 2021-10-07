import React, { useMemo } from 'react';
import { Linking } from 'react-native';

import { Container, Title, Text } from './styles';

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
      type: 'Telefone',
    };
    if (type === 'Whatsapp') return {
      color: 'rgba(10, 150, 50, 0.2)',
      title: 'Acessar',
      type: 'Whatsapp',
    };
    if (type === 'Email') return {
      color: 'rgba(150, 50, 50, 0.2)',
      title: 'Acessar',
      type: 'Email',
    };
    if (type === 'Facebook') return {
      color: 'rgba(15, 15, 250, 0.2)',
      title: 'Acessar',
      type: 'Facebook',
    };
    if (type === 'Twitter') return {
      color: 'rgba(5, 95, 215, 0.2)',
      title: 'Acessar',
      type: 'Facebook',
    };
    if (type === 'Linkedin') return {
      color: 'rgba(50, 50, 255, 0.2)',
      title: 'Acessar',
      type: 'Linkedin',
    };
    if (type === 'Instagram') return {
      color: 'rgba(250, 37, 155, 0.2)',
      title: 'Acessar',
      type: 'Instagram',
    };
    return {
      color: 'rgba(50, 50, 50, 0.2)',
      title: 'Acessar',
      type: 'Outros',
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
      <Text>{variables.type}</Text>
      <Text>{contact}</Text>
    </Container>
  );
}
