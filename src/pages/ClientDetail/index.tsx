import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Linking, ScrollView, Alert,Platform, KeyboardAvoidingView,Button, View, Text } from "react-native";
import {
  Container,
  Input,
  Description,
  Clients,
} from "./styles";
import api from "../../services";
import { Formik } from "formik";
import * as Yup from "yup";
import ItemContainer from '../../components/ItemContainer';
import ButtonDetail from '../../components/ButtonDetail'

interface clientDetailRouteParams {
  id: number;
}
interface clientDetail {
  address: string;
  city: string;
  full_name: string;
  number_address: string;
  phone: string;
  preferred_price: string;
}

const initialValues: clientDetail = {
  address: "",
  city: "",
  full_name: "",
  number_address: "",
  phone: "",
  preferred_price: "",
};

const schema = Yup.object().shape({
  full_name: Yup.string().required("Campo obrigatório"),
});

export default function ClientDetail() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as clientDetailRouteParams;
  const [client, setClient] = useState<clientDetail>(initialValues);

  useEffect(() => {
    api.get(`/clients/${params.id}/`).then((response) => {
      setClient({ ...client, ...response.data });
    });
  }, [params.id]);

  const updateClient = (values: object) => {
    try {
    api
      .patch(`/clients/${params.id}/`, values)
       Alert.alert("sucesso!", "cliente atualizado")
       } catch{
        Alert.alert("fracasso!", "contate o administrador do sistema")
      }
  };

  const message = `Olá ${client?.full_name}, estou entrando em contato pois gostaria de saber se o senhor
   vai fazer pedido de garrafões.`;

  function navigateBack() {
    navigation.navigate("ClientCreated");
  }

  function sendWhatsapp() {
    if (!client.phone) return;
    Linking.openURL(
      `whatsapp://send?phone=+55${client?.phone}&text=${message}`,
    );
  }


  return (
    <>

      <Container style={{ paddingHorizontal: 24 }}>


        <ScrollView
        showsVerticalScrollIndicator={false}>
          <Clients>
            <Formik
              initialValues={client}
              enableReinitialize={true}
              onSubmit={updateClient}
              validationSchema={schema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                return (
                  <>

                    <Description>Nome: </Description>
                    <Input
                      autoCapitalize="words"
                      autoCorrect={false}
                      placeholder="Nome completo"
                      onChangeText={handleChange("full_name")}
                      onBlur={handleBlur("full_name")}
                      value={values.full_name}
                      returnKeyType="next"
                    />

                    <Description>Telefone: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Número de contato"
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                    />
                    <Description>Cidade: </Description>

                    <Input
                      autoCorrect={false}
                      autoCapitalize="words"
                      placeholder="Nome da cidade"
                      onChangeText={handleChange("city")}
                      onBlur={handleBlur("city")}
                      value={values.city}
                      returnKeyType="next"
                    />
                    <Description>Preço Padrão: </Description>

                    <Input

                      keyboardType="numeric"
                      placeholder="Preço padrão"
                      onChangeText={handleChange("preferred_price")}
                      onBlur={handleBlur("preferred_price")}
                      value={String('R$ '+values.preferred_price +',00' )}
                      returnKeyType="send"
                    />
          <ButtonDetail onPress={handleSubmit}>Salvar Edições</ButtonDetail>
                  </>
                );
              }}
            </Formik>
          </Clients>

        </ScrollView>

      </Container>
<ItemContainer />
    </>
  );
}
