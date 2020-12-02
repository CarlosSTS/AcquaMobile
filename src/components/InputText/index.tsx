import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native'
import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  icon: string;
  onBlur?: any;
}
interface InputRef {
  focus(): void;
}
const InputText: React.RefForwardingComponent<InputRef, InputProps> = ({ icon, ...rest }, ref) => {

  const inputElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />

    </Container>
  )
}
export default forwardRef(InputText);
