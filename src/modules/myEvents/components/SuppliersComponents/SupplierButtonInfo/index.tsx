import React, { useState, useMemo } from 'react';
import { differenceInMilliseconds } from 'date-fns/esm';

import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import { NotificationNumber } from '../../../../../components/NotificationNumber';

import {
  Container, // 1
  SupplierConfirmationButton, // 2
  RowContainer, // 3
  RowTitle, // 4
  SupplierName, // 5
  DateText, // 6
  Icon, // 7
  IconContainer, // 8
  MenuButtonSection, // 9
  MenuButton, // 10
  MenuText, // 11
  FooterContainer, // 12
  NextTransactionContainer, // 13
  TransactionRow, // 14
  SectionBorder, // 15
  SectionTitleLine, // 16
  SectionTitle, // 17
  TransactionText, // 18
  SupplierNameButton, // 19
  SupplierLabel, // 20
  FieldContainer, // 21
} from './styles';
import InlineFormField from '../../../../../components/InlineFormField';

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
    updateEventSupplier,
    handleEditSupplierCategoryWindow,
    selectSupplierCategory,
    handleSupplierTransactionAgreementsWindow,
    handleSupplierNotesWindow,
    handleSupplierFilesWindow,
    handleSupplierBudgetsWindow,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(false);

  function handleEditName() {
    setEditName(!editName);
  }

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

  async function handleUpdateSupplierName(name: string) {
    await updateEventSupplier({
      ...selectedSupplier,
      name,
    });
  }

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
      <FieldContainer>
        <SupplierLabel>Categoria</SupplierLabel>
        <SupplierNameButton
          onPress={openSelectCategoryWindow}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
        >
          <SupplierName>{selectedSupplier.supplier_sub_category}</SupplierName>
        </SupplierNameButton>
      </FieldContainer>
      <SectionBorder />
        <FieldContainer>
          <SupplierLabel>Nome</SupplierLabel>
          {editName ? (
            <InlineFormField
              defaultValue={selectedSupplier.name}
              placeholder={selectedSupplier.name}
              handleOnSubmit={handleUpdateSupplierName}
              closeComponent={handleEditName}
              />
          ) : (
            <SupplierNameButton
              onPress={handleEditName}
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
            >
              <SupplierName>{selectedSupplier.name}</SupplierName>
            </SupplierNameButton>
          )}
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
              elevation: 5,
            }}
            onPress={handleSupplierTransactionsWindow}>
            <MenuText>Transações</MenuText>
            <IconContainer
              style={{
                elevation: 5,
              }}
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
              elevation: 5,
            }}
        >
          <MenuText>Notas</MenuText>
          <IconContainer
            style={{
              elevation: 5,
            }}
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
              elevation: 5,
            }}
          >
            <MenuText>Contratos</MenuText>
            <IconContainer
              style={{
                elevation: 5,
              }}
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
              elevation: 5,
            }}
          >
            <MenuText>Orçamentos</MenuText>
            <IconContainer
              style={{
                elevation: 5,
              }}
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
            elevation: 5,
          }}
        >
          <MenuText>Arquivos</MenuText>
          <IconContainer
            color={theme.color.text4}
            style={{
              elevation: 5,
            }}
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
              elevation: 5,
            }}
          >
            <MenuText>Mais</MenuText>
            <IconContainer
              style={{
                elevation: 5,
              }}
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
            elevation: 5,
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
