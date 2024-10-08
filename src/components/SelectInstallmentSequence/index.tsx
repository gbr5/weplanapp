import React from 'react';
import { getDay } from 'date-fns';

import { useTransaction } from '../../hooks/transactions';

import {
  Container,
  ButtonTitle,
  SequenceButton,
} from './styles';
import { useMemo } from 'react';
import Backdrop from '../Backdrop';
import { useCallback } from 'react';

interface IProps {
  selectedSequence: string;
  selectSequence: (data: string) => void;
  closeWindow: () => void;
}

export function SelectInstallmentSequence({
  selectSequence,
  selectedSequence,
  closeWindow,
}: IProps) {
  const {selectedDate } = useTransaction();

  const dayOfWeek = useMemo(() => {
    const day = getDay(selectedDate);
    if (day === 0) return 'Todo Domingo';
    if (day === 1) return 'Toda Segunda';
    if (day === 2) return 'Toda Terça';
    if (day === 3) return 'Toda Quarta';
    if (day === 4) return 'Toda Quinta';
    if (day === 5) return 'Toda Sexta';
    return 'Sábado';
  }, [selectedDate]);

  const handleSelect = useCallback((data: string) => {
    selectSequence
    closeWindow();
  }, []);
  return (
    <>
      <Backdrop
        closeFunction={closeWindow}
        zIndex={2}
        left="0%"
        width="110%"
      />
      <Container>
        <SequenceButton
          isActive={selectedSequence === 'Monthly'}
          onPress={() => selectSequence('Monthly')}
        >
          <ButtonTitle
            isActive={selectedSequence === 'Monthly'}
          >
            {`Mensal: Todo dia ${new Date(selectedDate).getDate()}`}
          </ButtonTitle>
        </SequenceButton>
        <SequenceButton
          onPress={() => selectSequence('Weekly')}
          isActive={selectedSequence === 'Weekly'}
        >
          <ButtonTitle
            isActive={selectedSequence === 'Weekly'}
          >
            {`Semanal: ${dayOfWeek}`}
          </ButtonTitle>
        </SequenceButton>
        <SequenceButton
          onPress={() => selectSequence('Customized')}
          isActive={selectedSequence === 'Customized'}
        >
          <ButtonTitle
            isActive={selectedSequence === 'Customized'}
          >
            Personalizado
          </ButtonTitle>
        </SequenceButton>
      </Container>
    </>
  );
}
