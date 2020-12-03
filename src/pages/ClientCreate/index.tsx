import React, { useRef } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import * as Yup from 'yup';

import api from '../../services/index';

import InputText from '../../components/InputText';
import Button from '../../components/Button';

import { Container, ErrorValue } from './styles';

/*interface ClientFormData {
  full_name: string;
  phone: string;
  preferred_price: number;
  city: string;
}*/
const initialValues: any = {
  full_name: '',
  phone: '',
  city: '',
  preferred_price: '',
}
const ClientCreate: React.FC = () => {
  const navigation = useNavigation();
  const phoneRef = useRef<TextInput>(null)
  const cityRef = useRef<TextInput>(null)
  const preferredPriceRef= useRef<TextInput>(null)

  const onSubmit = (values: any) => {
    try {
      api.post('/clients/', values);
      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Veja agora seus clientes cadastrados',
      );
      navigation.navigate('ClientCreated');
    } catch (err) {
      Alert.alert("Fracasso!", "contate o administrador do sistema")
    }
  };

  const schema = Yup.object().shape({
    full_name: Yup.string().required(' Informe um nome'),
    phone: Yup.string().required(' Informe um telefone'),
    city: Yup.string().required('Informe uma cidade'),
    preferred_price: Yup.number().required('Informe um preço'),
  });

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ paddingTop: 20 }} showsVerticalScrollIndicator={false}
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
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    icon="user"
                    placeholder="Nome"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      cityRef.current?.focus();
                    }}
                    onChangeText={handleChange("full_name")}
                    onBlur={handleBlur("full_name")}
                    value={String(values.full_name)}
                  />
                  {errors.full_name && (
                    <ErrorValue>{errors.full_name}</ErrorValue>
                  )}

                  <InputText
                    ref={cityRef}
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="words"
                    icon="map-pin"
                    placeholder="cidade"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      phoneRef.current?.focus();
                    }}
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    value={values.city}
                  />
                  {errors.city && (
                    <ErrorValue>{errors.city}</ErrorValue>
                  )}

                  <InputText
                    ref={phoneRef}
                    autoCorrect={false}
                    icon="phone"
                    placeholder="telefone"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      preferredPriceRef.current?.focus();
                    }}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={String(values.phone)}
                  />
                  {errors.phone && (
                    <ErrorValue>{errors.phone}</ErrorValue>
                  )}

                  <InputText
                  ref={preferredPriceRef}
                    keyboardType="numeric"
                    icon="dollar-sign"
                    placeholder="preço padrão"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}

                    onChangeText={handleChange("preferred_price")}
                    onBlur={handleBlur("preferred_price")}
                    value={String(values.preferred_price)}
                  />
                  {errors.preferred_price && (
                    <ErrorValue>{errors.preferred_price}</ErrorValue>
                  )}


                  <Button onPress={handleSubmit}>
                    Cadastrar
              </Button>
                </>
              )}
            </Formik>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ClientCreate;
