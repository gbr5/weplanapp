import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert, Platform } from 'react-native';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import IUserDTO from '../dtos/IUserDTO';
// import appleAuth, { appleAuthAndroid } from '@invertase/react-native-apple-authentication';


interface IAuthState {
  token: string;
  user: IUserDTO;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IGoogleSignInCredentials {
  email: string;
  googleToken: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
  googleId: string;
}

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface ICreatePersonInfoDTO {
  userId: string;
  first_name: string;
  last_name: string;
}

interface IAuthContextData {
  user: IUserDTO;
  loading: boolean;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signInWithGoogle(credentials: IGoogleSignInCredentials): Promise<void>;
  signOut(): void;
  createdefaultContactInfo(id: string): void;
  refreshUser(user: IUserDTO): void;
  createPersonInfo(personInfo: ICreatePersonInfoDTO): void;
  resetPassword(email: string): Promise<void>;
  getUser(id: string): Promise<IUserDTO | undefined>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  // function onAuthStateChanged(user: FirebaseAuthTypes.User) {
  //   console.log(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // useEffect(() => {
  //   // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
  //   if (Platform.OS === 'ios') {
  //     return appleAuth.onCredentialRevoked(async () => {
  //       console.warn('If this function executes, User Credentials have been Revoked');
  //       // useAuth().signOut();
  //     });
  //   }
  // }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  async function loadStorageData() {
    const [token, user] = await AsyncStorage.multiGet([
      '@WP-App:token',
      '@WP-App:user',
    ]);

    if (token[1] && user[1]) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token: token[1], user: JSON.parse(user[1]) });
    }
    setLoading(false);
  }
  useEffect(() => {
    loadStorageData();
  }, []);

  async function signOut() {
    await AsyncStorage.multiRemove([
      '@WP-App:token',
      '@WP-App:user',
      '@WP-App:events-as-owner',
      '@WP-App:events-as-member',
      '@WP-App:events-as-guest',
      '@WP-App:mobile-contacts',
      '@WP-App:friends',
      '@WP-App:friend-requests',
    ]);

    setData({} as IAuthState);
  }

  async function signIn({ email, password }: ISignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@WP-App:token', token],
      ['@WP-App:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  };

  async function signInWithGoogle({
      email,
      googleToken,
      googleId,
      imageUrl,
      familyName,
      givenName,
      name,
    }: IGoogleSignInCredentials) {
    const response = await api.post('google-sessions', {
      email,
      token: googleToken,
      googleId,
      name,
      familyName,
      givenName,
      imageUrl,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@WP-App:token', token],
      ['@WP-App:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  };

  async function createPersonInfo(personData: ICreatePersonInfoDTO) {
    try {
      const findFirstAndLast_name = await api.get(
        `person-info/${personData.first_name}/${personData.last_name}`,
      );
      if (findFirstAndLast_name.data.id) {
        return Alert.alert(
          'Erro no cadastro',
          `Nome e Sobrenome "${personData.first_name} ${personData.last_name}" já cadastrado em outro perfil, tente novamente.`,
        );
      }
      return await api.post(`/person-info/${personData.userId}`, {
        person_id: personData.userId,
        first_name: personData.first_name,
        last_name: personData.last_name,
      });
    } catch (err) {
      return Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      );
    }
  };

  function createdefaultContactInfo(id: string) {
    Promise.all([
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}1`,
        contact_type: 'Whatsapp',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}2`,
        contact_type: 'Phone',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}3`,
        contact_type: 'Email',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}4`,
        contact_type: 'Address',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}5`,
        contact_type: 'Instagram',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}6`,
        contact_type: 'Facebook',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}7`,
        contact_type: 'Linkedin',
      }),
      api.post(`/profile/contact-info/add/${id}`, {
        contact_info: `n/a - ${id}8`,
        contact_type: 'Website',
      }),
    ]);
  };

  async function refreshUser(updatedUser: IUserDTO) {
    await AsyncStorage.setItem(
      '@WP-App:user',
      JSON.stringify(updatedUser),
    );

    setData({
      token: data.token,
      user: updatedUser,
    });
  };

  async function resetPassword(email: string) {
    try {
      await api.post('/password/forgot', {
        email,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  async function getUser(id: string) {
    const response = await api.get(`/users/${id}`);

    if (response.data) return response.data;
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        resetPassword,
        signInWithGoogle,
        signOut,
        createdefaultContactInfo,
        refreshUser,
        createPersonInfo,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must bu used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
