import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Formik } from "formik";
import moment from "moment";
import api from "../../services/index";

import InputText from '../../components/InputText';
import DateInput from "../../components/DateInput";
import Button from '../../components/Button'
import { Container, ErrorValue } from "./styles";


const initialValues: any = {
  submit_date: moment().format("YYYY-MM-DD"),
  quantity: "",
  value: "",
  obs: "",
};

const PurchaseCreate: React.FC = () => {
  const navigation = useNavigation();

  const valueRef = useRef<TextInput>(null)
  const obsRef = useRef<TextInput>(null)
  const submitDateRef = useRef<TextInput>(null)
  const onSubmit = (values: any) => {
    try {
      api.post("/purchases/", values)

      Alert.alert("Sucesso!", "compra registrada!")
      navigation.navigate('PurchaseCreated')

    } catch {
      Alert.alert("Fracasso!", "contate o administrador do sistema")
    }
  };

  const schema = Yup.object().shape({
    quantity: Yup.number().required("Informe uma quantidade").min(1),
    value: Yup.number().required("Informe um valor unitàrio").min(0.1),
    obs: Yup.string(),
    submit_date: Yup.string().required("Informe uma data"),
  });

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Container>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={schema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                  <InputText
                    keyboardType="numeric"
                    icon="shopping-cart"
                    onChangeText={handleChange("quantity")}
                    returnKeyType="next"
                    onBlur={handleBlur("quantity")}
                    placeholder="quantidade"
                    value={String(values.quantity)}
                    onSubmitEditing={() => {
                      valueRef.current?.focus()
                    }}
                  />
                  {errors.quantity && (
                    <ErrorValue>{errors.quantity}</ErrorValue>
                  )}

                  <InputText
                    ref={valueRef}
                    keyboardType="numeric"
                    returnKeyType="next"
                    icon="dollar-sign"
                    onChangeText={handleChange("value")}
                    onBlur={handleBlur("value")}
                    placeholder="valor unitário"
                    onSubmitEditing={() => {
                      obsRef.current?.focus();
                    }}
                    value={String(values.value)}
                  />

                  {errors.value && (
                    <ErrorValue>{errors.value}</ErrorValue>
                  )}

                  <InputText
                    ref={obsRef}
                    keyboardType="default"
                    icon="alert-circle"
                    returnKeyType="send"
                    onChangeText={handleChange("obs")}
                    onBlur={handleBlur("obs")}
                    placeholder="Observação"
                    value={values.obs}
                    onSubmitEditing={handleSubmit}
                  />

                  <DateInput
                    //ref={submitDateRef}
                    icon="clock"
                    returnKeyType="send"
                    value={values.submit_date}
                    handleChange={handleChange("submit_date")}
                  // onSubmitEditing={handleSubmit}
                  />

                  <Button onPress={handleSubmit}>Acessar</Button>
                </>
              )}
            </Formik>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};


export default PurchaseCreate;
