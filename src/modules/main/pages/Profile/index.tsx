import React, { useCallback } from 'react';
import { Text } from 'react-native';

import { useAuth } from '../../../../hooks/auth';
import profilePlaceholder from '../../../../assets/profilePlaceholder.jpeg';

import Button from '../../../../components/Button';
import BackButton from '../../../../components/BackButton';

import {
  Container,
  Body,
  Avatar,
  AvatarButton,
  Title,
  FieldButton,
  Label,
} from './styles';
import theme from '../../../../global/styles/theme';
import { useProfile } from '../../../../hooks/profile';
import { EditUserNameWindow } from '../../components/EditUserNameWindow';
import { EditUserEmailWindow } from '../../components/EditUserEmailWindow';
import { EditGivenNameWindow } from '../../components/EditGivenNameWindow';
import { EditFamilyNameWindow } from '../../components/EditFamilyNameWindow';

const Profile: React.FC = () => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user, signOut } = useAuth();
  const {
    loading,
    editFamilyNameWindow,
    editGivenNameWindow,
    editUserEmailWindow,
    editUserNameWindow,
    editUserPasswordWindow,
    handleEditUserPasswordWindow,
    handleEditUserEmailWindow,
    handleEditGivenNameWindow,
    handleEditFamilyNameWindow,
    handleEditUserNameWindow,
    updateUserAvatar,
  } = useProfile();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const elevation = 5;

  return (
    <>
      {editUserNameWindow && <EditUserNameWindow />}
      {editUserEmailWindow && <EditUserEmailWindow />}
      {editGivenNameWindow && <EditGivenNameWindow />}
      {editFamilyNameWindow && <EditFamilyNameWindow />}
      <Container>
        <BackButton shadow={true} />
        <AvatarButton
          onPress={updateUserAvatar}
          style={{
            shadowColor: 'black',
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 15,
          }}
        >
          <Avatar
            source={!user.avatar_url ? profilePlaceholder : { uri: user.avatar_url }}
          />
        </AvatarButton>
        <Body>
          <FieldButton
            onPress={handleEditUserNameWindow}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation,
            }}
          >
            <Label>
              Nome de Usuário:
            </Label>
            <Title>
              {user.name}
            </Title>
          </FieldButton>
          <FieldButton
            onPress={handleEditGivenNameWindow}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation,
            }}
          >
            <Label>
              Nome:
            </Label>
            <Title>
              {user.personInfo && user.personInfo.first_name ? user.personInfo.first_name : '-'}
            </Title>
          </FieldButton>
          <FieldButton
            onPress={handleEditFamilyNameWindow}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation,
            }}
          >
            <Label>
              Sobrenome:
            </Label>
            <Title>
              {user.personInfo && user.personInfo.last_name ? user.personInfo.last_name : '-'}
            </Title>
          </FieldButton>
          <FieldButton
            onPress={handleEditUserEmailWindow}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation,
            }}
          >
            <Label>
              E-mail:
            </Label>
            <Title>
              {user.email}
            </Title>
          </FieldButton>
          <Button
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation,
            }}
            onPress={handleEditUserPasswordWindow}
          >
            Alterar a senha
          </Button>

          <Button
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation,
            }}
            onPress={handleSignOut}
          >
              Sair
          </Button>
        </Body>
      </Container>
    </>
  );
};

export default Profile;
