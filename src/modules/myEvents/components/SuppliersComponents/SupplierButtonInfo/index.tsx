import React, { useState, useMemo } from 'react';
import { differenceInMilliseconds } from 'date-fns/esm';
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
  SupplierNameButton,
  SupplierLabel,
  FieldContainer,
} from './styles';

export function SupplierButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedSupplier } = useMyEvent();
  const {
    handleCreateSupplierTransactionAgreementWindow,
    handleDischargingWindow,
    handleSupplierTransactionsWindow,
    handleEditSupplierNameWindow,
    handleEditSupplierCategoryWindow,
    selectSupplierCategory,
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

  function openSelectCategoryWindow() {
    selectSupplierCategory(selectedSupplier.supplier_sub_category);
    handleEditSupplierCategoryWindow();
  }

  const totalCost = useMemo(() => {
    return selectedSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled)
      .map(agreement => agreement.amount)
      .reduce((acc, cv) => acc + cv, 0);
  }, [selectedSupplier]);

  const nextPayment = useMemo(() => {
    const today = new Date();

    return eventDebitTransactions
      .filter(transaction => !transaction.isPaid)
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

  const nextPaymentLate = useMemo(() => {
    return new Date(nextPayment.due_date) < new Date();
  }, [nextPayment])

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
    >
      <FieldContainer>
        <SupplierLabel>Categoria</SupplierLabel>
        <SupplierNameButton
          onPress={openSelectCategoryWindow}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <SupplierName>{selectedSupplier.supplier_sub_category}</SupplierName>
        </SupplierNameButton>
      </FieldContainer>
      <SectionBorder />
      <FieldContainer>
        <SupplierLabel>Nome</SupplierLabel>
        <SupplierNameButton
          onPress={handleEditSupplierNameWindow}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <SupplierName>{selectedSupplier.name}</SupplierName>
        </SupplierNameButton>
      </FieldContainer>

      <SectionBorder />

      <MenuButtonSection horizontal >

        {/* <MenuButton>
          <MenuText>Agenda</MenuText>
          <IconContainer
            color={theme.color.atention_light}
          >
            <NotificationContainer>
              <NotificationNumber>0</NotificationNumber>
            </NotificationContainer>
            <Icon name="bell" />
          </IconContainer>
        </MenuButton> */}

        {selectedSupplier.isHired && (
          <MenuButton
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
            }}
            onPress={handleSupplierTransactionsWindow}>
            <MenuText>Transações</MenuText>
            <IconContainer
              color={theme.color.title}
            >
              <Icon name="dollar-sign" />
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
          <MenuText>Notas</MenuText>
          <IconContainer
            color={theme.color.info_light}
          >
            <NotificationContainer>
              <NotificationNumber>
                0
              </NotificationNumber>
            </NotificationContainer>
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton>

        {selectedSupplier.isHired && (
          <MenuButton
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
            }}
          >
            <MenuText>Contratos</MenuText>
            <IconContainer
              color={theme.color.success_light}
            >
              <Icon name="lock" />
            </IconContainer>
          </MenuButton>
        )}

        {!selectedSupplier.isHired && (
          <MenuButton
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
            }}
          >
            <MenuText>Orçamento</MenuText>
            <IconContainer
              color={theme.color.success_light}
              >
              <Icon name="mail" />
            </IconContainer>
          </MenuButton>
        )}

        {selectedSupplier.weplanUser && (
          <MenuButton
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
            }}
          >
            <MenuText>Avaliações</MenuText>
            <IconContainer
              color={theme.color.title}
            >
              <Icon name="star" />
            </IconContainer>
          </MenuButton>
        )}

        {selectedSupplier.weplanUser && (
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
        )}

      </MenuButtonSection>

      <SectionBorder />
      {nextPayment && nextPayment.id && (
        <>
          <NextTransactionContainer>
            <SectionTitle>
              {nextPaymentLate ? (
                'Pagamento Atrasado'
              ) : (
                'Próximo pagamento'
              )}
                </SectionTitle>
            <SectionTitleLine />
            <TransactionRow>
              {/* <TransactionText>{nextPayment.name} | </TransactionText> */}
              <TransactionText
                isLate={nextPaymentLate}
              >
                {formatBrlCurrency(nextPayment.amount)}  -  {formatOnlyDateShort(String(nextPayment.due_date))}
              </TransactionText>
              {/* <Icon name="square" /> */}
            </TransactionRow>

          </NextTransactionContainer>
          <SectionBorder />
        </>
      )}
      <NextTransactionContainer>
        <SectionTitle>Total Contratado</SectionTitle>
        <SectionTitleLine />
        <TransactionRow>
          <TransactionText
            isLate={false}
          >
            {formatBrlCurrency(totalCost)}
          </TransactionText>
        </TransactionRow>
      </NextTransactionContainer>
      <SectionBorder />

      <RowContainer>
        <SupplierConfirmationButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
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
