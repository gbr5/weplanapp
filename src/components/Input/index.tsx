/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

export interface InputRefProps {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRefProps, IInputProps> = (
  {
    name,
    icon,
    ...rest
  }, ref,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElementRef = useRef<any>(null);
  const {
    clearError, defaultValue = '', error, fieldName, registerField,
  } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleIsFocused = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    inputValueRef.current && setIsFilled(!!(inputValueRef.current.value && inputValueRef.current.value !== ''));
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);
  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {icon && <Icon isFocused={isFocused} isFilled={isFilled} name={icon} size={20} />}
      <TextInput
        isErrored={!!error}
        isFocused={isFocused}
        ref={inputElementRef}
        {...rest}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        onFocus={handleIsFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
      />
    </Container>
  );
};

export default forwardRef(Input);
