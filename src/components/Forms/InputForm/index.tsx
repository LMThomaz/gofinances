import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function InputForm(props: Props) {
  const { control, name, error, ...rest } = props;
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
