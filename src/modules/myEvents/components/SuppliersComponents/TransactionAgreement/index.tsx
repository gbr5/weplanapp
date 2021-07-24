import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Transaction } from '../../../../../components/Transaction';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import IEventSupplierTransactionDTO from '../../../../../dtos/IEventSupplierTransactionDTO';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';

import {
  Container,
  Amount,
  DateText,
  Installments,
  TransactionContainer,
} from './styles';

interface IProps {
  agreement: IEventSupplierTransactionAgreementDTO;
}

export function TransactionAgreement({
  agreement,
}: IProps) {
  const { getEventSupplierTransactions } = useEventSuppliers();
  const [agreementTransactions, setAgreementTransctions] = useState<IEventSupplierTransactionDTO[]>([]);

  const handleGetTransactions = useCallback(async () => {
    const response = await getEventSupplierTransactions(agreement.id);
    setAgreementTransctions(response);
  }, [agreement]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions]);

  return (
    <Container>
      <Amount>{agreement.amount}</Amount>
      <Installments>{agreement.number_of_installments}</Installments>
      <DateText>Criado: {formatOnlyDate(String(agreement.created_at))}</DateText>
      <TransactionContainer>
        {agreementTransactions.length > 0 && agreementTransactions.map(transaction => {
          return (
            <Transaction transaction={transaction.transaction} />
          );
        })}
      </TransactionContainer>
    </Container>
  );
}
