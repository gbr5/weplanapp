import React, { useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Feather';

import WindowContainer from '../../../../components/WindowContainer';

import {
  Container,
  ContactTypeButton,
  ContactTypeText,
  Title,
  IconContainer,
} from './styles';

interface IProps {
  selectedContactType: string;
  selectContactType: (e: string) => void;
  closeWindow: () => void;
}

const SelectContactType: React.FC<IProps> = ({
  closeWindow,
  selectContactType,
  selectedContactType,
}) => {
  const handleSelectContactType = useCallback((e: string) => {
    selectContactType(e);
    closeWindow();
  }, [selectContactType, closeWindow]);
  return (
    <WindowContainer
      closeWindow={closeWindow}
      height="90%"
      left="2%"
      top="5%"
      width="96%"
      zIndex={17}
    >
      <Container>
        <Title>Selecione o tipo de contato</Title>
        <ContactTypeButton
          isActive={selectedContactType === 'Whatsapp'}
          onPress={() => handleSelectContactType('Whatsapp')}
        >
          <ContactTypeText isActive={selectedContactType === 'Whatsapp'}>
            Whatsapp
          </ContactTypeText>
          <IconContainer>
            <Feather name="phone" size={30} />
          </IconContainer>
        </ContactTypeButton>
        <ContactTypeButton
          isActive={selectedContactType === 'Phone'}
          onPress={() => handleSelectContactType('Phone')}
        >
          <ContactTypeText isActive={selectedContactType === 'Phone'}>
            Phone
          </ContactTypeText>
          <IconContainer>
            <Feather name="phone-call" size={30} />
          </IconContainer>
        </ContactTypeButton>
        <ContactTypeButton
          isActive={selectedContactType === 'Address'}
          onPress={() => handleSelectContactType('Address')}
        >
          <ContactTypeText isActive={selectedContactType === 'Address'}>
            Address
          </ContactTypeText>
          <IconContainer>
            <Icon name="map-pin" size={30} />
          </IconContainer>
        </ContactTypeButton>
        <ContactTypeButton
          isActive={selectedContactType === 'Email'}
          onPress={() => handleSelectContactType('Email')}
        >
          <ContactTypeText isActive={selectedContactType === 'Email'}>
            Email
          </ContactTypeText>
          <IconContainer>
            <Icon name="mail" size={30} />
          </IconContainer>
        </ContactTypeButton>
      </Container>
    </WindowContainer>
  );
};

export default SelectContactType;
