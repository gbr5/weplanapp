import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../../../hooks/auth';
import logoImg from '../../../../assets/headerLogo.png';

import {
  Container,
  SignOutButton,
  MenuOption,
  ButtonText,
  Header,
  Logo,
  Body,
} from './styles';
import ShortConfirmationWindow from '../../../../components/ShortConfirmationWindow';
import CreateEvent from '../../../myEvents/components/CreateEvent';
import BackButton from '../../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { useUnsetEventVariables } from '../../../../hooks/unsetEventVariables';
import { useFriends } from '../../../../hooks/friends';

const Menu: React.FC = () => {
  const navigation = useNavigation();

  const { signOut } = useAuth();
  const { unsetVariables } = useUnsetEventVariables();
  const { resetFriendsVariables } = useFriends();

  const [confirmationWindow, setConfirmationWindow] = useState(false);
  const [createEventWindow, setCreateEventWindow] = useState(false);

  const handleConfirmSignOut = useCallback((e: boolean) => {
    setConfirmationWindow(e);
  }, []);

  const handleCreateEventWindow = useCallback((e: boolean) => {
    setCreateEventWindow(e);
  }, []);

  function navigateToFriendsPage() {
    navigation.navigate('FriendsPage')
  }

  function handleSignOut() {
    unsetVariables();
    resetFriendsVariables();
    signOut();
  }

  return (
    <Container>
      {confirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={() => handleConfirmSignOut(false)}
          firstButtonLabel="Sair"
          firstFunction={handleSignOut}
          question="Deseja desconectar sua conta?"
          secondButtonLabel="Não Sair"
          secondFunction={() => handleConfirmSignOut(false)}
        />
      )}
      {createEventWindow && (
        <CreateEvent handleCloseWindow={() => handleCreateEventWindow(false)} />
      )}
      <Header>
        <BackButton unsetVariables={unsetVariables} />
        <Logo source={logoImg} />
      </Header>
      <Body>
        <MenuOption onPress={() => handleCreateEventWindow(true)}>
          <ButtonText>Criar Evento</ButtonText>
          <Icon size={30} name="plus" />
        </MenuOption>
        <MenuOption>
          <ButtonText>Configurações</ButtonText>
          <Icon size={30} name="settings" />
        </MenuOption>
        <MenuOption onPress={navigateToFriendsPage}>
          <ButtonText>Contatos</ButtonText>
          <Icon size={30} name="users" />
        </MenuOption>
        <MenuOption>
          <ButtonText>Arquivos</ButtonText>
          <Icon size={30} name="archive" />
        </MenuOption>
        <MenuOption>
          <ButtonText>Compromissos</ButtonText>
          <Icon size={30} name="calendar" />
        </MenuOption>
        <MenuOption>
          <ButtonText>Financeiro</ButtonText>
          <Icon size={30} name="dollar-sign" />
        </MenuOption>
        <SignOutButton onPress={() => handleConfirmSignOut(true)}>
          <ButtonText>Sair</ButtonText>
          <Icon size={30} name="power" />
        </SignOutButton>
      </Body>
    </Container>
  );
};

export default Menu;
