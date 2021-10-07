import React, { useRef, useState } from 'react';

import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import { TextInput } from 'react-native';

import {
  Container,
  InputContainer,
  InputField,
  InputIcon,
} from './styles';

interface IProps {
  defaultValue: string;
  updateValue: (e: string) => void;
  onSubmit: () => void;
}

const CurrencyInput: React.FC<IProps> = ({
  defaultValue,
  updateValue,
  onSubmit,
}) => {
  const amountRef = useRef<TextInput>(null);
  const [value, setValue] = useState(defaultValue);

  function handleValue(data: string) {
    if (data === '0') data = '';
    data = data.replace(/\D/g, '');
    data = String(Number(data)).replace(/(\d)(\d{2})$/g, '$1,$2');
    data = data.replace(/(?=(\d{3})+(\D))\B/g, '.');
    setValue(data);
    updateValue(data);
  }

  function onSubmitValue() {
    updateValue(value);
    onSubmit();
  }

  return (
    <Container>
      <InputContainer>
        <InputIcon name="dollar-sign" />
        <InputField
          ref={amountRef}
          placeholder={formatBrlCurrency(0)}
          defaultValue={value}
          onChangeText={handleValue}
          returnKeyType="next"
          keyboardType="numeric"
          onSubmitEditing={onSubmitValue}
        />
      </InputContainer>
    </Container>
  );
};

export default CurrencyInput;
