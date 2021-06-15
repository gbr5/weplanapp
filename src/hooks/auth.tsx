import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  isCompany: boolean;
}

interface IAuthState {
  token: string;
  user: IUser;
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
  user: IUser;
  loading: boolean;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signInWithGoogle(credentials: IGoogleSignInCredentials): Promise<void>;
  signOut(): void;
  createdefaultContactInfo(id: string): void;
  updateUser(user: IUser): void;
  createPersonInfo(personInfo: ICreatePersonInfoDTO): void;
  resetPassword(email: string): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

// eslint-disable-next-line react/prop-types
const AuthProvider: React.FC = ({ children }) => {
  // const { addToast } = useToast();
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@WePlan-Party:token',
        '@WePlan-Party:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@WePlan-Party:token',
      '@WePlan-Party:user',
    ]);

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@WePlan-Party:token', token],
      ['@WePlan-Party:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signInWithGoogle = useCallback(
    async ({
      email,
      googleToken,
      googleId,
      imageUrl,
      familyName,
      givenName,
      name,
    }: IGoogleSignInCredentials) => {
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
        ['@WePlan-Party:token', token],
        ['@WePlan-Party:user', JSON.stringify(user)],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [],
  );

  const createPersonInfo = useCallback(
    async (personData: ICreatePersonInfoDTO) => {
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
    },
    [],
  );

  const createdefaultContactInfo = useCallback((id: string) => {
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
  }, []);

  const updateUser = useCallback(
    async (updatedUser: IUser) => {
      await AsyncStorage.setItem(
        '@WePlan-Party:user',
        JSON.stringify(updatedUser),
      );

      setData({
        token: data.token,
        user: updatedUser,
      });
    },
    [data],
  );

  const resetPassword = useCallback(
    async (email: string) => {
      try {
        await api.post('/password/forgot', {
          email,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [],
  );

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
        updateUser,
        createPersonInfo,
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
