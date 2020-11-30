import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView
} from "react-native";

import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/index";
import moment from "moment";

import InputText from '../../components/InputText'
import DateInput from "../../components/DateInput";
import RemoteSelect from "../../components/RemoteSelect";
import Button from '../../components/Button'
import { Container,ErrorValue } from "./styles";

/*
interface CreateMoveFormData {
  order_date: string;
  value: Number;
  status: Number;
  obs: string;
}
*/

const initialValues: any = {
  order_date: moment().format("YYYY-MM-DD"),
  value: "",
  status: "",
  obs: "",
};

const schema = Yup.object().shape({
  value: Yup.number().required("Informe um valor unitàrio").min(0.1),
  status: Yup.number().required("Selecione um tipo de movimento"),
  obs: Yup.string(),
  order_date: Yup.string().required("Informe uma data"),
});

const MoveCreate: React.FC = () => {
  const [clients, setClients] = useState([]);
const navigation = useNavigation();
  const onSubmit = (values: any) => {
    try {
    api.post("/moves/", values)
      Alert.alert("Sucesso!", "movimento registrado!")
      navigation.navigate('MoveCreated')
    } catch { Alert.alert("Fracasso!", "contate o administrador do sistema")
  }
  };

  const getClientData = () => {
    api
      .get("/clients/", { params: { limit: 1000 } })
      .then((response) => setClients(response.data))
      .catch(() => Alert.alert("Fracasso"));
  };

  useEffect(() => {
    getClientData();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
                    <Container>


          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <RemoteSelect
                  onSelectChange={handleChange("status")}
                  data={[
                    { value: 0, label: "ENTRADA" },
                    { value: 1, label: "SAIDA" },
                  ]}
                  labelField="label"
                  valueField="value"
                  initialLabel="Selecione um tipo de movimento"
                />


                {errors.status && (
                  <ErrorValue>{errors.status}</ErrorValue>
                )}
                <InputText
                  keyboardType="numeric"
                  icon="dollar-sign"
                  onChangeText={handleChange("value")}
                  onBlur={handleBlur("value")}
                  placeholder="valor"
                  value={String(values.value)}
                />

                {errors.value && (
                  <ErrorValue>{errors.value}</ErrorValue>
                )}

                <InputText
                  keyboardType="default"
                  icon="alert-circle"
                  onChangeText={handleChange("obs")}
                  onBlur={handleBlur("obs")}
                  placeholder="Observação"
                  value={values.obs}
                />

                <DateInput
                icon="clock"
                  value={values.order_date}
                  handleChange={handleChange("order_date")}
                />

                  <Button   onPress={handleSubmit}>Registrar</Button>
              </>
            )}
          </Formik>
          </Container>
          </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};



export default MoveCreate;
