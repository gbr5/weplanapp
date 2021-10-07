import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useTransaction } from '../../../hooks/transactions';

import { WindowHeader } from '../../WindowHeader';
import { MenuBooleanButton } from '../../MenuBooleanButton';
import WindowContainer from '../../WindowContainer';
import IFileDTO from '../../../dtos/IFileDTO';
import { FileButton } from '../../FilesComponents/FileButton';

import {
  Container,
  FileContainer,
  IconContainer,
  Icon,
} from './styles';

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

  const files: IFileDTO[] = useMemo(() => {
    return selectedEventTransaction.transaction.files.map(file => {
      const {
        id,
        name,
        url,
        transaction_id,
        created_at,
        updated_at,
      } = file;
      return {
        id,
        name,
        url,
        type: '',
        file_origin: 'transaction',
        origin_id: transaction_id,
        created_at,
        updated_at,
      };
    })
  }, [selectedEventTransaction]);

  return (
    <WindowContainer
      closeWindow={handleTransactionFilesWindow}
      zIndex={18}
      top="0%"
      left="0%"
      height="100%"
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
        {files.length > 0 && (
          <FileContainer
            data={files}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <FileButton key={item.id} file={item} />
              );
            }}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
