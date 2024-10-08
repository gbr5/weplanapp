import React, { useCallback, useMemo } from 'react';
import { Alert, Linking } from 'react-native';

import IFileDTO from '../../../dtos/IFileDTO';
import theme from '../../../global/styles/theme';
import { useAuth } from '../../../hooks/auth';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useFiles } from '../../../hooks/files';
import { useTransaction } from '../../../hooks/transactions';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import { FileButtonInfo } from '../FileButtonInfo';

import {
  Container,
  FileContainer,
  FileName,
  EditButton,
  EditIcon,
  CreatedAtContainer,
  CreatedAt,
  Underline,
} from './styles';

interface IProps {
  file: IFileDTO;
}

export function FileButton({ file }: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const { isOwner } = useEventVariables();
  const { handleSelectedFile, selectedFile } = useFiles();
  const { selectedEventTransaction } = useTransaction();

  const isAllowed = useMemo(() => {
    if (
      isOwner ||
      user.id === selectedEventTransaction.transaction.payee_id ||
      user.id === selectedEventTransaction.transaction.payer_id
    ) return true;
    return false;
  }, [isOwner, selectedEventTransaction, user]);

  const handlePress = useCallback(async () => {
    if (!isAllowed) return;
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(file.url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(file.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${file.url}`);
    }
  }, []);

  function handleSelectFile() {
    selectedFile.id === file.id && handleSelectedFile({} as IFileDTO);
    selectedFile.id !== file.id && handleSelectedFile(file);
  }

  const fileType = useMemo(() => {
    return file.url.split('.com/')[1].split('.')[1];
  }, [file]);


  return (
    <>
      <Container
        style={selectedFile.id !== file.id && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={handleSelectFile}
      >
        <FileContainer>
          <FileName>{file.name}</FileName>
          <EditButton onPress={handlePress}>
            <EditIcon name="link" />
          </EditButton>
        </FileContainer>
        <Underline />
        <CreatedAtContainer>
          <CreatedAt>Atualizado:</CreatedAt>
          <CreatedAt>{formatOnlyDateShort(String(file.updated_at))}</CreatedAt>
          <CreatedAt>Tipo:</CreatedAt>
          <CreatedAt>{fileType}</CreatedAt>
        </CreatedAtContainer>
      </Container>
      {selectedFile.id === file.id && <FileButtonInfo />}
    </>
  );
}
