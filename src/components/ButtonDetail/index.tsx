import React from "react";
import {RectButtonProperties} from 'react-native-gesture-handler';

import {
  RoutesButton,
  RoutesButtonText,
} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  onPress: any
}
const ButtonDetail: React.FC<ButtonProps> = ({children, ...rest},props) => (
    <RoutesButton {...rest}>
    <RoutesButtonText onPress={props.onPress}>{children}</RoutesButtonText>
        </RoutesButton>
  );


export default ButtonDetail;
