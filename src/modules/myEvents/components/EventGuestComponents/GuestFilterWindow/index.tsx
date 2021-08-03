import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventGuests } from '../../../../../hooks/eventGuests';

import {
  Container,
  TitleButton,
  Icon,
  FilterContainer,
  FilterLabel,
} from './styles';

export function GuestFilterWindow() {
  const {
    handleGuestFilterWindow,
    allGuestsFilter,
    confirmedGuestsFilter,
    notConfirmedGuestsFilter,
    onlyMyGuestsFilter,
    handleAllGuestsFilter,
    handleConfirmedGuestsFilter,
    handleNotConfirmedGuestsFilter,
    handleOnlyMyGuestsFilter,
  } = useEventGuests();

  return (
    <WindowContainer
      closeWindow={handleGuestFilterWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="60%"
      width="96%"
    >
      <Container>
        <WindowHeader overTitle="Filtrar" title="Convidados" />
        <FilterContainer>
          <TitleButton onPress={handleAllGuestsFilter}>
            <FilterLabel>Todos</FilterLabel>
            {allGuestsFilter ? (
              <Icon name="check-square" />
            ) : (
              <Icon name="square" />
            )}
          </TitleButton>
        </FilterContainer>
        <FilterContainer>
          <TitleButton onPress={handleConfirmedGuestsFilter}>
            <FilterLabel>Confirmados</FilterLabel>
            {!allGuestsFilter && confirmedGuestsFilter ? (
              <Icon name="check-square" />
            ) : (
              <Icon name="square" />
            )}
          </TitleButton>
        </FilterContainer>
        <FilterContainer>
          <TitleButton onPress={handleNotConfirmedGuestsFilter}>
            <FilterLabel>Não Confirmados</FilterLabel>
            {!allGuestsFilter && notConfirmedGuestsFilter ? (
              <Icon name="check-square" />
            ) : (
              <Icon name="square" />
            )}
          </TitleButton>
        </FilterContainer>
        <FilterContainer>
          <TitleButton onPress={handleOnlyMyGuestsFilter}>
            <FilterLabel>Apenas os meus</FilterLabel>
            {!allGuestsFilter && onlyMyGuestsFilter ? (
              <Icon name="check-square" />
            ) : (
              <Icon name="square" />
            )}
          </TitleButton>
        </FilterContainer>
      </Container>
      <Button onPress={handleGuestFilterWindow} >Fechar</Button>
    </WindowContainer>
  );
}
