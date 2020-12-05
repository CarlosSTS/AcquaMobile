import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import {
  Container,
  Input,
  Description,
  Paths,
  Header,
  HeaderText
} from "./styles";
import api from "../../services";
import { Formik } from "formik";
import * as Yup from "yup";
import ItemContainer from '../../components/ItemContainer'
import ButtonDetail from '../../components/ButtonDetail'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from "react-native-gesture-handler";
interface pathsRouteParams {
  id: number;
  full_name: string;
  phone: string;
}
interface pathsDetail {
  client: number;
  quantity: number;
  step_days: number;
  total: number;
  user: number;
  value: number;
  warning_sub_day: number;
}

const initialValues: pathsDetail = {
  client: 0,
  quantity: 0,
  step_days: 0,
  total: 0,
  user: 0,
  value: 0,
  warning_sub_day: 0,
};

const schema = Yup.object().shape({
  client: Yup.string().required("Informe um cliente"),
});

export default function ClientRouteDetail() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as pathsRouteParams;
  const [paths, setPaths] = useState<pathsDetail>(initialValues);

  useEffect(() => {
    api.get(`/paths/${params.id}/`).then((response) => {
      setPaths({ ...paths, ...response.data });
    });
  }, [params.id]);

  const updatepaths = (values: object) => {
    try {
      api
        .patch(`/paths/${params.id}/`, values)
      Alert.alert("sucesso!", "rota atualizada")
    } catch {
      Alert.alert("fracasso!", "contate o administrador do sistema")
    }
  };
  function navigateToCreatedRouteClient() {
    navigation.navigate('CreatedRouteClient')
  }
  return (
    <>
      <Header style={{ shadowColor: '#000', elevation: 8, }}>
        <RectButton>
          <FeatherIcon style={{paddingLeft: 12}} onPress={navigateToCreatedRouteClient} name="arrow-left" color="#fff" size={24} />
        </RectButton>
        <HeaderText>Editar rota de cliente</HeaderText>
        <FeatherIcon name="arrow-left" color="#3d9be9" size={24} />
      </Header>

      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <ScrollView showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Paths>
              <Formik
                initialValues={paths}
                enableReinitialize={true}
                onSubmit={updatepaths}
                validationSchema={schema}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                  return (
                    <>

                      <Description>Cliente: </Description>
                      <Input
                        autoCorrect={false}
                        placeholder="Cliente"
                        keyboardType="numeric"
                        onChangeText={handleChange("client")}
                        onBlur={handleBlur("client")}
                        value={String(values.client)}
                        returnKeyType="next"
                      />

                      <Description>Quantidade: </Description>
                      <Input
                        autoCorrect={false}
                        placeholder="Quantidade"
                        keyboardType="numeric"
                        onChangeText={handleChange("quantity")}
                        onBlur={handleBlur("quantity")}
                        value={String(values.quantity)}
                        returnKeyType="next"
                      />

                      <Description>Dias de parada: </Description>
                      <Input
                        autoCorrect={false}
                        placeholder="Dias de parada"
                        keyboardType="numeric"
                        onChangeText={handleChange("step_days")}
                        onBlur={handleBlur("step_days")}
                        value={String(values.step_days)}
                        returnKeyType="next"
                      />

                      <Description>Total: </Description>
                      <Input
                        autoCorrect={false}
                        autoCapitalize="characters"
                        placeholder="Total"
                        onChangeText={handleChange("total")}
                        onBlur={handleBlur("total")}
                        value={String(values.total)}
                        keyboardType="numeric"
                        returnKeyType="next"
                      />

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

                      <Description>Valor: </Description>
                      <Input
                        autoCorrect={false}
                        autoCapitalize="characters"
                        placeholder="Valor"
                        onChangeText={handleChange("value")}
                        onBlur={handleBlur("value")}
                        value={String(values.value)}
                        keyboardType="numeric"
                        returnKeyType="next"
                      />

                      <Description>Aviso Sobre o dia: </Description>
                      <Input
                        autoCorrect={false}
                        autoCapitalize="words"
                        placeholder="Aviso Sobre o dia"
                        onChangeText={handleChange("warning_sub_day")}
                        onBlur={handleBlur("warning_sub_day")}
                        value={String(values.warning_sub_day)}
                        returnKeyType="next"
                      />

                      <ButtonDetail onPress={handleSubmit}>Salva Edições</ButtonDetail>

                    </>
                  );
                }}
              </Formik>
            </Paths>

          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
      <ItemContainer />
    </>
  );
}
