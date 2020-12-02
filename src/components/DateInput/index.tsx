import React, {useState, useRef, useImperativeHandle, forwardRef } from 'react';
import TextInputMask from "react-native-text-input-mask";
import {TextInputProps} from "react-native"
import moment from "moment";
import { Container, Icon, FontAwesomeIcon } from "./styles";

interface DateInputProps extends TextInputProps {
  handleChange: Function;
  icon: string;
}

interface InputRef {
  focus(): void;
}

const DateInput: React.RefForwardingComponent<InputRef,DateInputProps> = (props,ref,...rest) => {

  const inputElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

  const [value, setValue] = useState(moment().format("DD/MM/YYYY"));
  const onChange = (formatted: string) => {
    const isoValue = moment(formatted, "DD/MM/YYYY").format("YYYY-MM-DD");
    setValue(formatted);
    props.handleChange(isoValue);
  };

  return (
    <Container>
      {props.icon === "clock" ? (
        <Icon name={props.icon} size={20} color="#666360" />
      ): (
      <FontAwesomeIcon name={props.icon} size={20} color="#666360" />
        )}

      <TextInputMask
      ref={inputElementRef}
      keyboardType="numeric"
        onChangeText={onChange}
        mask={"[00]/[00]/[0000]"}
        value={value}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(DateInput);
