import React, { useMemo } from 'react';
import theme from '../../../global/styles/theme';
import { useFiles } from '../../../hooks/files';
import { WindowHeader } from '../../WindowHeader';

import {
  Container,
  FieldButton,
  FieldLabel,
  Label,
} from './styles';

export function FileButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedFile, handleEditFileWindow } = useFiles();

  const name = useMemo(() => selectedFile.name, [selectedFile]);

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
    >
      <WindowHeader title="Editar Arquivo" />
      {/* <Label>Editar Arquivo</Label> */}
      <FieldButton
        onPress={handleEditFileWindow}
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 5,
        }}
      >
        <FieldLabel>Nome do arquivo</FieldLabel>
        <Label>{name}</Label>
      </FieldButton>
    </Container>
  );
}
