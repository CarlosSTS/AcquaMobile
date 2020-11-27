import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, Alert,KeyboardAvoidingView,Platform } from "react-native";
import {
  Container,
  Input,
  Description,
  Moves,
} from "./styles";
import api from "../../services";
import { Formik } from "formik";
import * as Yup from "yup";
import ItemContainer from '../../components/ItemContainer'
import ButtonDetail from '../../components/ButtonDetail'

interface moveRouteParams {
  id: number;
}
interface moveDetail {
  obs: string;
  type: number;
  user: number;
  value: number;

}

const initialValues: moveDetail = {
  type: 0,
  user: 0,
  value: 0,
  obs: "",
};

const schema = Yup.object().shape({
  obs: Yup.string().required("Campo obrigatório"),
});

export default function MoveDetail() {
  const route = useRoute();

  const params = route.params as moveRouteParams;
  const [move, setMove] = useState<moveDetail>(initialValues);

  useEffect(() => {
    api.get(`/moves/${params.id}/`).then((response) => {
      setMove({ ...move, ...response.data });
    });
  }, [params.id]);

  const updatemove = (values: object) => {
    try {
      api
        .patch(`/moves/${params.id}/`, values)
      Alert.alert("sucesso!", "Movimento atualizado")
    } catch {
      Alert.alert("fracasso!", "contate o administrador do sistema")
    }
  };

  return (
    <>
      <Container>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
                               <Moves>
            <Formik
              initialValues={move}
              enableReinitialize={true}
              onSubmit={updatemove}
              validationSchema={schema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                return (
                  <>

                    <Description>Usuário: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Usuário"
                      onChangeText={handleChange("user")}
                      onBlur={handleBlur("user")}
                      value={String(values.user)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />


                    <Description>Tipo: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder="Tipo"
                      onChangeText={handleChange("type")}
                      onBlur={handleBlur("type")}
                      value={String(values.type)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />

                    <Description>Observação: </Description>

                    <Input
                      autoCorrect={false}
                      autoCapitalize="words"
                      placeholder="Observação"
                      onChangeText={handleChange("obs")}
                      onBlur={handleBlur("obs")}
                      value={values.obs}
                      returnKeyType="next"
                    />

                    <Description>value: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="value"
                      onChangeText={handleChange("value")}
                      onBlur={handleBlur("value")}
                      value={String(values.value)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                    <ButtonDetail onPress={handleSubmit}>Salva Edições</ButtonDetail>
                  </>
                );
              }}
            </Formik>
          </Moves>

        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
      <ItemContainer />
    </>
  );
}
