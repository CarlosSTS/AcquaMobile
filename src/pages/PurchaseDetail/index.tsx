import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView, Alert,KeyboardAvoidingView,Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../services';

import ItemContainer from '../../components/ItemContainer'
import ButtonDetail from '../../components/ButtonDetail'

import {
  Container,
  Input,
  Description,
  Shoppings,
} from './styles';

interface shoppingRouteParams {
  id: number;
}
interface ShoppingDetail {
  quantity: number;
  submit_date: string;
  user: number;
  value: number;
  obs: string;
}

const initialValues: ShoppingDetail = {
  quantity: 0,
  submit_date: '',
  user: 0,
  value: 0,
  obs: '',
};

const schema = Yup.object().shape({
  obs: Yup.string().required('Campo obrigatório'),
});

export default function PurchaseDetail() {
  const route = useRoute();

  const params = route.params as shoppingRouteParams;
  const [shopping, setShopping] = useState<ShoppingDetail>(initialValues);

  useEffect(() => {
    api.get(`/purchases/${params.id}/`).then((response) => {
      setShopping({ ...shopping, ...response.data });
    });
  }, [params.id]);

  const updateShopping = (values: object) => {
    try {
      api.patch(`/purchases/${params.id}/`, values);
      Alert.alert('sucesso!', 'Compra atualizada');
    } catch {
      Alert.alert('fracasso!', 'contate o administrador do sistema');
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
                              <Shoppings>
            <Formik
              initialValues={shopping}
              enableReinitialize
              onSubmit={updateShopping}
              validationSchema={schema}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
                return (
                  <>
                    <Description>Data: </Description>

                    <Input
                      keyboardType="numeric"
                      placeholder="Data da compra"
                      onChangeText={handleChange('submit_date')}
                      onBlur={handleBlur('submit_date')}
                      value={String(values.submit_date)}
                      returnKeyType="send"
                    />

                    <Description>Quantidade: </Description>
                    <Input
                      autoCorrect={false}
                      placeholder="Quantidade"
                      keyboardType="numeric"
                      onChangeText={handleChange('quantity')}
                      onBlur={handleBlur('quantity')}
                      value={String(values.quantity)}
                      returnKeyType="next"
                    />
                    <Description>Valor unitátio: </Description>

                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Valor unitário"
                      onChangeText={handleChange('value')}
                      onBlur={handleBlur('value')}
                      value={String(values.value)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                    <Description>Observação: </Description>

                    <Input
                      autoCorrect={false}
                      autoCapitalize="words"
                      placeholder="Observação"
                      onChangeText={handleChange('obs')}
                      onBlur={handleBlur('obs')}
                      value={values.obs}
                      returnKeyType="next"
                    />

                    <ButtonDetail onPress={handleSubmit}>Salva Edições</ButtonDetail>

                  </>
                );
              }}
            </Formik>
          </Shoppings>

        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
      <ItemContainer />
    </>
  );
}
