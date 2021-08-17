import React, { createContext, useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import api from '../services/api';
import { useAuth } from './auth';
import IUserDTO from '../dtos/IUserDTO';

interface IUserProfile {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

interface IUserPersonInfo {
  first_name: string;
  last_name: string;
  person_id: string;
}

interface ProfileContextType {
  loading: boolean;
  editUserNameWindow: boolean;
  editGivenNameWindow: boolean;
  editFamilyNameWindow: boolean;
  editUserEmailWindow: boolean;
  editUserPasswordWindow: boolean;
  handleEditUserNameWindow: () => void;
  handleEditGivenNameWindow: () => void;
  handleEditFamilyNameWindow: () => void;
  handleEditUserEmailWindow: () => void;
  handleEditUserPasswordWindow: () => void;
  updateUserAvatar: () => Promise<void>;
  updateUserProfile: (data: IUserProfile) => Promise<void>;
  updateUserPersonInfo: (data: IUserPersonInfo) => Promise<void>;
  createUserPersonInfo: (data: IUserPersonInfo) => Promise<void>;
}

const ProfileContext = createContext({} as ProfileContextType);

const ProfileProvider: React.FC = ({ children }) => {
  const { user, refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [editUserNameWindow, setEditUserNameWindow] = useState(false);
  const [editUserEmailWindow, setEditUserEmailWindow] = useState(false);
  const [editGivenNameWindow, setEditGivenNameWindow] = useState(false);
  const [editFamilyNameWindow, setEditFamilyNameWindow] = useState(false);
  const [editUserPasswordWindow, setEditUserPasswordWindow] = useState(false);

  function handleEditUserNameWindow() {
    setEditUserNameWindow(!editUserNameWindow);
  }
  function handleEditUserEmailWindow() {
    setEditUserEmailWindow(!editUserEmailWindow);
  }
  function handleEditUserPasswordWindow() {
    setEditUserPasswordWindow(!editUserPasswordWindow);
  }
  function handleEditGivenNameWindow() {
    setEditGivenNameWindow(!editGivenNameWindow);
  }
  function handleEditFamilyNameWindow() {
    setEditFamilyNameWindow(!editFamilyNameWindow);
  }
  async function updateUserAvatar() {
    try {
      setLoading(true);
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 0.5,
      });
      if (!response.cancelled) {
        let data = new FormData();
        data.append(
          'avatar',
          {
            uri: response.uri,
            type: `${response.type}/${response.uri.replace(/^[^\r\n]+\./g, '')}`,
            name: response.uri.replace(/^[^\r\n]+ImagePicker\//g, ''),
          },
        );
        const updatedUser = await api.patch(`/users/avatar/${user.id}`, data);
        refreshUser(updatedUser.data);
      }
    } catch(err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function getUserProfile() {
    try {
      setLoading(true);
      const updatedUser = await api.get<IUserDTO>(`/profile`);
      refreshUser(updatedUser.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserProfile({
    email,
    name,
    old_password,
    password,
    password_confirmation,
  }: IUserProfile) {
    try {
      setLoading(true);
      const updatedUser = await api.put(`/profile/${user.id}`, {
        email,
        name,
        old_password,
        password,
        password_confirmation,
      });
      refreshUser(updatedUser.data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserPersonInfo({
    first_name,
    last_name,
    person_id,
  }: IUserPersonInfo) {
    try {
      setLoading(true);
      await api.put(`/person-info/edit`, {
        first_name,
        last_name,
        person_id,
      });
      await getUserProfile();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createUserPersonInfo({
    first_name,
    last_name,
    person_id,
  }: IUserPersonInfo) {
    try {
      setLoading(true);
      await api.post(`/person-info/${user.id}`, {
        first_name,
        last_name,
        person_id,
      });
      await getUserProfile();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        loading,
        editFamilyNameWindow,
        editGivenNameWindow,
        editUserEmailWindow,
        editUserNameWindow,
        editUserPasswordWindow,
        handleEditFamilyNameWindow,
        handleEditGivenNameWindow,
        handleEditUserEmailWindow,
        handleEditUserPasswordWindow,
        handleEditUserNameWindow,
        updateUserAvatar,
        updateUserProfile,
        updateUserPersonInfo,
        createUserPersonInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);

  if (!context) throw new Error('useProfile must be used within an AuthProvider!')
  return context;
}

export { ProfileProvider, useProfile };
