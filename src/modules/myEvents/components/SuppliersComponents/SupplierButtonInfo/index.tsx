import { differenceInMilliseconds } from 'date-fns/esm';
import React, { useState } from 'react';
import { useMemo } from 'react';
import theme from '../../../../../global/styles/theme';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  NotificationContainer,
  NotificationNumber,
  SupplierConfirmationButton,
  RowContainer,
  RowTitle,
  SupplierName,
  GreenIcon,
  RedIcon,
  DateText,
  Icon,
  IconContainer,
  MenuButtonSection,
  MenuButton,
  MenuText,
  FooterContainer,
  NextTransactionContainer,
  TransactionRow,
  SectionBorder,
  SectionTitleLine,
  SectionTitle,
  TransactionText,
} from './styles';

export function SupplierButtonInfo() {
  const { selectedSupplier } = useMyEvent();
  const {
    handleCreateSupplierTransactionAgreementWindow,
    handleDischargingWindow,
  } = useEventSuppliers();
  const { eventDebitTransactions } = useTransaction();

  const [loading, setLoading] = useState(false);

  async function updateSupplierIsHired() {
    try {
      setLoading(true);
      selectedSupplier.isHired && handleDischargingWindow();
      !selectedSupplier.isHired && handleCreateSupplierTransactionAgreementWindow();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  const nextPayment = useMemo(() => {
    const today = new Date();

    return eventDebitTransactions
      .filter(transaction => transaction.payee_id === selectedSupplier.id)
      .sort((a, b) => {
        if (
          differenceInMilliseconds(
            new Date(a.due_date),
            today,
          ) > differenceInMilliseconds(new Date(b.due_date), today)
        ) {
          return 1
        };
        if (
          differenceInMilliseconds(
            new Date(a.due_date),
            today,
          ) < differenceInMilliseconds(new Date(b.due_date), today)
        ) {
          return -1
        };
        return 0;
      })[0];
  }, [selectedSupplier]);

  return (
    <Container>
      <SupplierName>{selectedSupplier.supplier_sub_category}</SupplierName>

      <SectionBorder />

      <MenuButtonSection horizontal >

        <MenuButton>
          <MenuText>Tarefas</MenuText>
          <IconContainer
            color={theme.color.atention_light}
          >
            <NotificationContainer>
              <NotificationNumber>0</NotificationNumber>
            </NotificationContainer>
            <Icon name="bell" />
          </IconContainer>
        </MenuButton>

        {selectedSupplier.isHired && (
          <MenuButton>
            <MenuText>Transações</MenuText>
            <IconContainer
              color={theme.color.title}
            >
              <Icon name="dollar-sign" />
            </IconContainer>
          </MenuButton>
        )}
        <MenuButton>
          <MenuText>Notas</MenuText>
          <IconContainer
            color={theme.color.info_light}
          >
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton>

        {selectedSupplier.isHired && (
          <MenuButton>
            <MenuText>Contratos</MenuText>
            <IconContainer
              color={theme.color.success_light}
            >
              <Icon name="lock" />
            </IconContainer>
          </MenuButton>
        )}

        {!selectedSupplier.isHired && (
          <MenuButton>
            <MenuText>Orçamento</MenuText>
            <IconContainer
              color={theme.color.success_light}
              >
              <Icon name="mail" />
            </IconContainer>
          </MenuButton>
        )}

        {!selectedSupplier.weplanUser && (
          <MenuButton>
            <MenuText>Avaliações</MenuText>
            <IconContainer
              color={theme.color.title}
            >
              <Icon name="star" />
            </IconContainer>
          </MenuButton>
        )}

        <MenuButton>
          <MenuText>Mais</MenuText>
          <IconContainer
            color={theme.color.primary_light}
          >
            <Icon name="plus" />
          </IconContainer>
        </MenuButton>

      </MenuButtonSection>

      <SectionBorder />

      <RowContainer>
        <SupplierConfirmationButton
          isHired={selectedSupplier.isHired}
          onPress={updateSupplierIsHired}
        >
          {selectedSupplier.isHired ? (
            <>
              <RowTitle>Contratado</RowTitle>
              {loading ? (
                <Icon name="loader" />
              ) : (
                <Icon name="check-square" />
              )}
            </>
          ) : (
            <>
              <RowTitle>Contratar ?</RowTitle>
              {loading ? (
                <Icon name="loader" />
              ) : (
                <Icon name="square" />
              )}
            </>
          )}
        </SupplierConfirmationButton>

      </RowContainer>

      <SectionBorder />

      {nextPayment && nextPayment.id && (
        <>
          <NextTransactionContainer>
            <SectionTitle>Próximo pagamento</SectionTitle>
            <SectionTitleLine />
            <TransactionRow>
              <TransactionText>{formatBrlCurrency(nextPayment.amount)}  -  {formatOnlyDateShort(String(nextPayment.due_date))}</TransactionText>
              <Icon name="square" />
            </TransactionRow>

          </NextTransactionContainer>
          <SectionBorder />
        </>
      )}

      <FooterContainer>
        <DateText>Criado dia: </DateText>
        <DateText>
          {
            formatOnlyDate(String(selectedSupplier.created_at))
          }
        </DateText>
      </FooterContainer>
    </Container>
  );
}
