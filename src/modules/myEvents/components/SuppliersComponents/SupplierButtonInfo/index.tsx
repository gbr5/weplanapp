import React, { useState, useMemo } from 'react';
import { differenceInMilliseconds } from 'date-fns/esm';

import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import InlineFormField from '../../../../../components/InlineFormField';
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
import { useEventTasks } from '../../../../../hooks/eventTasks';
import IEventTransactionAgreementDTO from '../../../../../dtos/IEventTransactionAgreementDTO';
import { useTransaction } from '../../../../../hooks/transactions';
import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import { useMyEvent } from '../../../../../hooks/myEvent';

export function SupplierButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    selectedEvent,
    selectedEventSupplier,
    eventTransactions,
    selectedUserEventTasks,
  } = useEventVariables();
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
    handleEventWePlanSupplierTaskWindow,
  } = useEventSuppliers();
  const { getSelectedUserEventTasks } = useMyEvent();
  const {
    handlePayee,
    handlePayer,
    handleSelectedEventTransactionAgreements,
  } = useTransaction();

  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(false);

  function handleEditName() {
    setEditName(!editName);
  }

  async function updateSupplierIsHired() {
    try {
      setLoading(true);
      selectedEventSupplier.isHired && handleDischargingWindow();
      !selectedEventSupplier.isHired && handleCreateSupplierTransactionAgreementWindow();
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function openSelectCategoryWindow() {
    selectSupplierCategory(selectedEventSupplier.supplier_sub_category);
    handleEditSupplierCategoryWindow();
  }

  const totalCost = useMemo(() => {
    return selectedEventSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled)
      .map(agreement => Number(agreement.amount))
      .reduce((acc, cv) => acc + cv, 0);
  }, [selectedEventSupplier]);

  const nextPayment = useMemo(() => {
    const today = new Date();

    return eventTransactions
      .filter(({ transaction }) => !transaction.isPaid)
      .filter(({ transaction }) => transaction.payee_id === selectedEventSupplier.id)
      .sort((a, b) => {
        if (
          differenceInMilliseconds(
            new Date(a.transaction.due_date),
            today,
          ) > differenceInMilliseconds(new Date(b.transaction.due_date), today)
        ) {
          return 1;
        };
        if (
          differenceInMilliseconds(
            new Date(a.transaction.due_date),
            today,
          ) < differenceInMilliseconds(new Date(b.transaction.due_date), today)
        ) {
          return -1;
        };
        return 0;
      })[0];
  }, [selectedEventSupplier]);

  const nextPaymentLate = useMemo(() => {
    return !nextPayment ?? new Date(nextPayment.transaction.due_date) < new Date();
  }, [nextPayment])
  const numberOfNotes = useMemo(() => {
    return selectedEventSupplier.notes.length;
  }, [selectedEventSupplier.notes]);
  const numberOfBudgets = useMemo(() => {
    return selectedEventSupplier.budgets.length;
  }, [selectedEventSupplier.notes]);
  const numberOfFiles = useMemo(() => {
    return selectedEventSupplier.files.length;
  }, [selectedEventSupplier.notes]);
  const numberOfTransactions = useMemo(() => {
    let transactions = 0;
    selectedEventSupplier.transactionAgreements
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
  }, [selectedEventSupplier.notes]);
  const numberOfTransactionAgreements = useMemo(() => {
    return selectedEventSupplier.transactionAgreements
      .filter(agreement => !agreement.isCancelled).length;
  }, [selectedEventSupplier.notes]);

  const top = '-40%';
  const left = '-20%';

  async function handleUpdateSupplierName(name: string) {
    await updateEventSupplier({
      ...selectedEventSupplier,
      name,
    });
  }

  function handleSupplierAgreementsWindow() {
    handlePayee({
      id: selectedEventSupplier.id,
      name: selectedEventSupplier.name,
    });
    handlePayer({
      id: selectedEvent.id,
      name: selectedEvent.name,
    });
    const agreements: IEventTransactionAgreementDTO[] = selectedEventSupplier
      .transactionAgreements.map(agreement => {
      const transactions: IEventTransactionDTO[] = agreement.transactions
        .map(({ transaction }) => {
        return {
          agreement_id: agreement.id,
          agreement_type: 'owner',
          event_id: selectedEvent.id,
          transaction,
        };
      });
      const {
        amount,
        created_at,
        id,
        isCancelled,
        number_of_installments,
        supplier_id,
        updated_at,
      } = agreement;
      return {
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: supplier_id,
        participant_type: 'supplier',
        transactions,
        updated_at,
      };
    });
    handleSelectedEventTransactionAgreements(agreements);
    handleSupplierTransactionAgreementsWindow();
  }

  async function openSupplierTasksWindow() {
    getSelectedUserEventTasks(selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier.id);
    handleEventWePlanSupplierTaskWindow();
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
          <SupplierName>{selectedEventSupplier.supplier_sub_category}</SupplierName>
        </SupplierNameButton>
      </FieldContainer>
      <SectionBorder />
        <FieldContainer>
          <SupplierLabel>Nome</SupplierLabel>
          {editName ? (
            <InlineFormField
              defaultValue={selectedEventSupplier.name}
              placeholder={selectedEventSupplier.name}
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
              <SupplierName>{selectedEventSupplier.name}</SupplierName>
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
        {selectedEventSupplier.weplanUser &&
          selectedEventSupplier.eventWeplanSupplier &&
          selectedEventSupplier.eventWeplanSupplier.id &&
          selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier.id &&
          selectedEventSupplier.eventWeplanSupplier.weplanEventSupplier && (
          <MenuButton
            style={{
              shadowColor: theme.menuShadow.shadowColor,
              shadowOffset: theme.menuShadow.shadowOffset,
              shadowOpacity: theme.menuShadow.shadowOpacity,
              shadowRadius: theme.menuShadow.shadowRadius,
              elevation: 5,
            }}
            onPress={openSupplierTasksWindow}
          >
            <MenuText>Tarefas</MenuText>
            <IconContainer
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
              color={theme.color.atention_light}
            >
              <NotificationNumber
                top={top}
                left={left}
                number={selectedUserEventTasks.length}
              />
              <Icon name="bell" />
            </IconContainer>
          </MenuButton>
        )}
        {selectedEventSupplier.isHired && (
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

        {selectedEventSupplier.isHired && (
          <MenuButton
            onPress={handleSupplierAgreementsWindow}
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

        {!selectedEventSupplier.isHired && (
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

        {selectedEventSupplier.weplanUser && (
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
      {selectedEventSupplier.isHired ? (
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
          isHired={selectedEventSupplier.isHired}
          onPress={updateSupplierIsHired}
        >
          {selectedEventSupplier.isHired ? (
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
            formatOnlyDate(String(selectedEventSupplier.created_at))
          }
        </DateText>
      </FooterContainer>
    </Container>
  );
}
