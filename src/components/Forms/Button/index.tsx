import React from 'react';
import {
  GestureHandlerRootView,
  RectButtonProps,
} from 'react-native-gesture-handler';
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function Button(props: Props) {
  const { title, onPress, ...rest } = props;

  function handlePress() {
    console.log('press');
    onPress();
  }

  return (
    <GestureHandlerRootView>
      <Container onPress={handlePress} {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}
