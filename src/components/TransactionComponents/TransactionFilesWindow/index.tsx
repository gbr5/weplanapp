import React, { useCallback } from 'react';
import {
  Alert,
  Linking,
} from 'react-native';
import { useTransaction } from '../../../hooks/transactions';

import WindowContainer from '../../WindowContainer';
import Button from '../../Button';

import {
  Container,
  FileContainer,
  Image,
} from './styles';
import { SectionHeader } from '../../SectionHeader';
import { useMyEvent } from '../../../hooks/myEvent';
import { Link } from '@react-navigation/native';

export function TransactionFilesWindow() {
  const {
    handleSectionDescriptionWindow,
  } = useMyEvent();
  const {
    selectedEventTransaction,
    handleTransactionFilesWindow,
    importTransactionFile,
  } = useTransaction();

  async function handleFile() {
    await importTransactionFile(selectedEventTransaction.transaction.id);
  }

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
        {/* <WindowHeader overTitle={`Transação: ${selectedEventTransaction.transaction.name}`} title="Arquivos" /> */}
        <SectionHeader
          handleAddButton={handleFile}
          handleInfoButton={handleSectionDescriptionWindow}
          title={`Arquivos de ${selectedEventTransaction.transaction.name}`}
        />
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
