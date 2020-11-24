import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, ButtonText} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  onPress: any
}

const Button: React.FC<ButtonProps> = ({children, ...rest},props) => (
  <Container {...rest}>
    <ButtonText onPress={props.onPress}>{children}</ButtonText>
  </Container>
);

export default Button;
