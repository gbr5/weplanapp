import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useUnsetEventVariables } from '../../../../hooks/unsetEventVariables';
import theme from '../../../../global/styles/theme';
import { useFriends } from '../../../../hooks/friends';
import { useAuth } from '../../../../hooks/auth';

import logoImg from '../../../../assets/headerLogo.png';

import ShortConfirmationWindow from '../../../../components/ShortConfirmationWindow';
import CreateEvent from '../../../myEvents/components/CreateEvent';
import { MenuOptionButton } from '../../components/MenuOptionButton';

import {
  Container,
  Header,
  Logo,
  Body,
} from './styles';
import BackButton from '../../../../components/BackButton';

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

  function navigateToEventsPage() {
    navigation.navigate('Dashboard')
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
        <BackButton />
        <Logo source={logoImg} />
      </Header>
      <Body>
        <MenuOptionButton
          color={theme.color.text1}
          icon="home"
          onPress={navigateToEventsPage}
          text="Dashboard"
        />
        <MenuOptionButton
          color={theme.color.text1}
          icon="plus"
          onPress={() => handleCreateEventWindow(true)}
          text="Criar Evento"
        />
        <MenuOptionButton
          color={theme.color.text1}
          icon="users"
          onPress={navigateToFriendsPage}
          text="Amigos"
        />
        <MenuOptionButton
          color={theme.color.atention}
          icon="power"
          onPress={() => handleConfirmSignOut(true)}
          text="Sair"
        />
      </Body>
    </Container>
  );
};

export default Menu;
