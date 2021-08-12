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
import { NotificationNumber } from '../../../../../components/NotificationNumber';

export function SupplierButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedSupplier, eventTransactions } = useMyEvent();
  const {
    handleCreateSupplierTransactionAgreementWindow,
    handleDischargingWindow,
    handleSupplierTransactionsWindow,
    handleEditSupplierNameWindow,
    handleEditSupplierCategoryWindow,
    selectSupplierCategory,
    handleSupplierTransactionAgreementsWindow,
    handleSupplierNotesWindow,
    handleSupplierFilesWindow,
    handleSupplierBudgetsWindow,
  } = useEventSuppliers();

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
      .map(agreement => Number(agreement.amount))
      .reduce((acc, cv) => acc + cv, 0);
  }, [selectedSupplier]);

  const nextPayment = useMemo(() => {
    const today = new Date();

    return eventTransactions
      .filter(({ transaction }) => !transaction.isPaid)
      .filter(({ transaction }) => transaction.payee_id === selectedSupplier.id)
      .sort((a, b) => {
        if (
          differenceInMilliseconds(
            new Date(a.transaction.due_date),
            today,
          ) > differenceInMilliseconds(new Date(b.transaction.due_date), today)
        ) {
          return 1
        };
        if (
          differenceInMilliseconds(
            new Date(a.transaction.due_date),
            today,
          ) < differenceInMilliseconds(new Date(b.transaction.due_date), today)
        ) {
          return -1
        };
        return 0;
      })[0];
  }, [selectedSupplier]);

  const nextPaymentLate = useMemo(() => {
    return !nextPayment ?? new Date(nextPayment.transaction.due_date) < new Date();
  }, [nextPayment])

  const numberOfNotes = useMemo(() => {
    return selectedSupplier.notes.length;
  }, [selectedSupplier.notes]);

  const numberOfBudgets = useMemo(() => {
    return selectedSupplier.budgets.length;
  }, [selectedSupplier.notes]);
  const numberOfFiles = useMemo(() => {
    return selectedSupplier.files.length;
  }, [selectedSupplier.notes]);
  const numberOfTransactions = useMemo(() => {
    let transactions = 0;
    selectedSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled)
      .map(agreement => {
        return agreement.transactions.map(({ transaction }) => {
          if (!transaction.isCancelled) {
            transactions = transactions + 1;
          }
          return transaction;
        });
      });
    return transactions;
  }, [selectedSupplier.notes]);
  const numberOfTransactionAgreements = useMemo(() => {
    return selectedSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled).length;
  }, [selectedSupplier.notes]);

  const top = '-50%';
  const left = '-20%';

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
              <NotificationNumber
                top={top}
                left={left}
                number={numberOfTransactions}
              />
              <Icon name="dollar-sign" />
            </IconContainer>
          </MenuButton>
        )}
        <MenuButton
          onPress={handleSupplierNotesWindow}
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
            <NotificationNumber
              top={top}
              left={left}
              number={numberOfNotes}
            />
            <Icon name="file-text" />
          </IconContainer>
        </MenuButton>

        {selectedSupplier.isHired && (
          <MenuButton
            onPress={handleSupplierTransactionAgreementsWindow}
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
              <NotificationNumber
                top={top}
                left={left}
                number={numberOfTransactionAgreements}
              />
              <Icon name="lock" />
            </IconContainer>
          </MenuButton>
        )}

        {!selectedSupplier.isHired && (
          <MenuButton
            onPress={handleSupplierBudgetsWindow}
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
            }}
          >
            <MenuText>Orçamentos</MenuText>
            <IconContainer
              color={theme.color.success_light}
            >
              <NotificationNumber
                top={top}
                left={left}
                number={numberOfBudgets}
              />
              <Icon name="mail" />
            </IconContainer>
          </MenuButton>
        )}

        <MenuButton
          onPress={handleSupplierFilesWindow}
          style={{
            shadowColor: theme.menuShadow.shadowColor,
            shadowOffset: theme.menuShadow.shadowOffset,
            shadowOpacity: theme.menuShadow.shadowOpacity,
            shadowRadius: theme.menuShadow.shadowRadius,
          }}
        >
          <MenuText>Arquivos</MenuText>
          <IconContainer
            color={theme.color.text4}
          >
            <NotificationNumber
              top={top}
              left={left}
              number={numberOfFiles}
            />
            <Icon name="folder" />
          </IconContainer>
        </MenuButton>

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
      {nextPayment && nextPayment.transaction.id && (
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
              {/* <TransactionText>{nextPayment.transaction.name} | </TransactionText> */}
              <TransactionText
                isLate={nextPaymentLate}
              >
                {formatBrlCurrency(nextPayment.transaction.amount)}  -  {formatOnlyDateShort(String(nextPayment.transaction.due_date))}
              </TransactionText>
              {/* <Icon name="square" /> */}
            </TransactionRow>

          </NextTransactionContainer>
          <SectionBorder />
        </>
      )}
      {selectedSupplier.isHired ? (
        <>
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
        </>
      ) : (
        <>
          <NextTransactionContainer>
            <SectionTitle>Total Orçado</SectionTitle>
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
        </>
      )}

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
