import React from 'react';
import { View } from 'react-native';
import { Container, Title, Amount } from './styles';

interface Props {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard(props: Props) {
  const { title, amount, color } = props;
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
