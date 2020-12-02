import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {StyleSheet} from 'react-native';
import {ContainerRemoteButtonText} from './styles';
interface RemoteSelectProps {
  data: Array<object>;
  onSelectChange: any;
  labelField: string;
  valueField: string;
  initialLabel: string;
  style?: any;
  onSubmitEditing?: any;
}

const RemoteSelect = (props: RemoteSelectProps) => {
  const [selected, setSelected] = useState("");

  const onValueChange = (value: any) => {
    const newValue = String(value);
    setSelected(value);
    props.onSelectChange(newValue);
  };

  return (
    <ContainerRemoteButtonText>
      <Picker
        style={styles.input}
        selectedValue={selected}
        onValueChange={onValueChange}
      >
        <Picker.Item label={props.initialLabel} value="" />

        {props.data.map((item: any) => (
          <Picker.Item
            key={item[props.valueField]}
            label={item[props.labelField]}
            value={item[props.valueField]}
          />
        ))}
      </Picker>
    </ContainerRemoteButtonText>
  );
};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular',
  },
});

export default RemoteSelect;
