import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Button, Container, ContainerStyled, Icon, Title } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface Props extends RectButtonProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export function TransactionTypeButton(props: Props) {
  const { type, title, isActive, ...rest } = props;
  return (
    <Container>
      <ContainerStyled isActive={isActive} type={type}>
        <Button {...rest}>
          <Icon name={icons[type]} type={type} />
          <Title>{title}</Title>
        </Button>
      </ContainerStyled>
    </Container>
  );
}
