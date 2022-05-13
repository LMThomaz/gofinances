import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Container, Category, Icon } from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton(props: Props) {
  const { title, onPress } = props;

  return (
    <GestureHandlerRootView>
      <Container onPress={onPress}>
        <Category>{title}</Category>
        <Icon name='chevron-down' />
      </Container>
    </GestureHandlerRootView>
  );
}
