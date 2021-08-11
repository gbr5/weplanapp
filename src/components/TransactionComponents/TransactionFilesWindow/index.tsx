import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useTransaction } from '../../../hooks/transactions';

import { WindowHeader } from '../../WindowHeader';
import { MenuBooleanButton } from '../../MenuBooleanButton';
import WindowContainer from '../../WindowContainer';
import Button from '../../Button';

import {
  Container,
  FileContainer,
  IconContainer,
  Icon,
} from './styles';
import theme from '../../../global/styles/theme';

export function TransactionFilesWindow() {
  const {
    selectedEventTransaction,
    handleTransactionFilesWindow,
    importTransactionFile,
    importTransactionImage,
    loading,
  } = useTransaction();

  const [imageButton, setImageButton] = useState(true);

  async function handleFile() {
    setImageButton(false);
    await importTransactionFile(selectedEventTransaction.transaction.id);
  }

  async function handleImages() {
    setImageButton(true);
    await importTransactionImage(selectedEventTransaction.transaction.id);
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handlePress = useCallback(async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);


  return (
    <WindowContainer
      closeWindow={handleTransactionFilesWindow}
      zIndex={56}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader overTitle={`Transação: ${selectedEventTransaction.transaction.name}`} title="Arquivos" />
        {loading ? (
          <IconContainer>
            <Icon name="loader" />
          </IconContainer>
        ) : (
          <MenuBooleanButton
            firstActive={imageButton}
            firstFunction={handleImages}
            firstLabel="+ Imagem"
            secondFunction={handleFile}
            secondLabel="+ Arquivo"
          />
        )}
        {selectedEventTransaction.transaction.files.length > 0 && (
          <FileContainer
            data={selectedEventTransaction.transaction.files}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Button
                  key={item.id}
                  onPress={() => handlePress(item.url)}
                >
                {/* <Link to={item.url}> */}
                  {item.name}
                {/* </Link> */}
                </Button>
              );
            }}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
