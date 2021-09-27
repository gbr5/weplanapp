import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { MenuBooleanButton } from '../../../../../components/MenuBooleanButton';
import Button from '../../../../../components/Button';

import {
  Container,
  FileContainer,
  IconContainer,
  Icon,
} from './styles';
import { useEventVariables } from '../../../../../hooks/eventVariables';

export function EventSupplierFilesWindow() {
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierFilesWindow,
    importSupplierFile,
    importSupplierImage,
    loading,
  } = useEventSuppliers();

  const [imageButton, setImageButton] = useState(true);

  async function handleFile() {
    setImageButton(false);
    await importSupplierFile(selectedEventSupplier.id);
  }

  async function handleImages() {
    setImageButton(true);
    await importSupplierImage(selectedEventSupplier.id);
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
      closeWindow={handleSupplierFilesWindow}
      zIndex={56}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader overTitle={`Fornecedor(a): ${selectedEventSupplier.name}`} title="Arquivos" />
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
        {selectedEventSupplier.files.length > 0 && (
          <FileContainer
            data={selectedEventSupplier.files}
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
