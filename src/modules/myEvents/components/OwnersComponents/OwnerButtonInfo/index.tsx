import React from 'react';
import theme from '../../../../../global/styles/theme';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  Name,
  DateText,
  Icon,
  IconContainer,
  MenuButtonSection,
  MenuButton,
  MenuText,
  FooterContainer,
  SectionBorder,
} from './styles';

export function OwnerButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedEventOwner, selectedEvent } = useEventVariables();
  // const { } = useEventOwners();
  // const { eventDebitTransactions } = useTransaction();

  // const [loading, setLoading] = useState(false);

  return (
    <Container
      style={{
        elevation: 5,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
    >
      {selectedEventOwner.description !== '' && (
        <Name>{selectedEventOwner.description}</Name>
      )}

      <SectionBorder />

      <MenuButtonSection horizontal >
        {selectedEvent.event_type === 'Prom' && (
          <MenuButton
            style={{
              elevation: 5,
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
          >
            <MenuText>Transações</MenuText>
            <IconContainer
              style={{
                elevation: 5,
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
              }}
              color={theme.color.title}
            >
              <Icon name="dollar-sign" />
            </IconContainer>
          </MenuButton>
        )}
        {/* <MenuButton>
          <MenuText>Notas</MenuText>
          <IconContainer
            color={theme.color.info_light}
          >
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton> */}
        {selectedEvent.event_type === 'Prom' && (
          <MenuButton>
            <MenuText>Contratos</MenuText>
            <IconContainer
              color={theme.color.success_light}
            >
              <Icon name="lock" />
            </IconContainer>
          </MenuButton>
        )}

        <MenuButton
          style={{
            shadowColor: theme.menuShadow.shadowColor,
            shadowOffset: theme.menuShadow.shadowOffset,
            shadowOpacity: theme.menuShadow.shadowOpacity,
            shadowRadius: theme.menuShadow.shadowRadius,
          }}
        >
          <MenuText>Mais</MenuText>
          <IconContainer
            color={theme.color.primary_light}
          >
            <Icon name="plus" />
          </IconContainer>
        </MenuButton>

      </MenuButtonSection>

      <SectionBorder />
{/*
      <SectionBorder /> */}

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {formatOnlyDateShort(String(selectedEventOwner.created_at))}
        </DateText>
      </FooterContainer>
    </Container>
  );
}
