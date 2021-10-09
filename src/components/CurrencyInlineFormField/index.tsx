import React, { useRef, useState } from 'react';

import CloseButton from '../CloseButton';
import theme from '../../global/styles/theme';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import { TextInput } from 'react-native';
import { round2Decimal } from '../../utils/round2Decimal';

import {
  Container,
  Button,
  Icon,
  InputContainer,
  InputField,
  InputIcon,
} from './styles';

interface IProps {
  defaultValue: string;
  handleOnSubmit: (e: string) => void;
  closeComponent?: Function;
}

const CurrencyInlineFormField: React.FC<IProps> = ({
  defaultValue,
  handleOnSubmit,
  closeComponent,
}) => {
  const amountRef = useRef<TextInput>(null);
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const [value, setValue] = useState(String(round2Decimal(Number(defaultValue))));

  function handleValue(data: string) {
    if (data === '0') data = '';
    data = data.replace(/\D/g, '');
    data = String(Number(data)).replace(/(\d)(\d{2})$/g, '$1,$2');
    data = data.replace(/(?=(\d{3})+(\D))\B/g, '.');
    setValue(data);
  }

  function handleSubmit() {
    if (value !== '' && value !== defaultValue) {
      handleOnSubmit(value);
    }
    closeComponent && closeComponent();
  }

  return (
    <Container>
      {closeComponent && (
        <CloseButton style={{ right: '0%', top: '0%' }} closeFunction={() => closeComponent()} />
      )}
      <InputContainer>
        <InputIcon name="dollar-sign" />
        <InputField
          ref={amountRef}
          placeholder={formatBrlCurrency(0)}
          defaultValue={value}
          onChangeText={e => handleValue(e)}
          returnKeyType="next"
          keyboardType="numeric"
          onSubmitEditing={handleSubmit}
        />
      </InputContainer>
      <Button
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 3,
        }}
        onPress={handleSubmit}
      >
        <Icon name="check" />
      </Button>
    </Container>
  );
};

export default CurrencyInlineFormField;
