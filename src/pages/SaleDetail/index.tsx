import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView, Alert,Platform,KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../services';

import ItemContainer from '../../components/ItemContainer';
import ButtonDetail from '../../components/ButtonDetail'
import {
  Container,
  Input,
  Description,
  Sales,
} from './styles';

interface saleRouteParams {
  id: number;
  full_name: string;
  phone: string;
}
interface SaleDetail {
  client: number;
  discounts: number;
  quantity: number;
  user: number;
  value: number;
  obs: string;
  total: number;
}

const initialValues: SaleDetail = {
  client: 0,
  discounts: 0,
  quantity: 0,
  user: 0,
  value: 0,
  obs: '',
  total: 0,
};

const schema = Yup.object().shape({
  obs: Yup.string().required('Informe uma observação'),
});

export default function SaleDetail() {
  const route = useRoute();

  const params = route.params as saleRouteParams;
  const [sale, setSale] = useState<SaleDetail>(initialValues);

  useEffect(() => {
    api.get(`/sales/${params.id}/`).then((response) => {
      setSale({ ...sale, ...response.data });
    });
  }, [params.id]);

  const updatesale = (values: object) => {
    try {
      api.patch(`/sales/${params.id}/`, values);
      Alert.alert('sucesso!', 'venda atualizada');
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
                             <Sales>
            <Formik
              initialValues={sale}
              enableReinitialize
              onSubmit={updatesale}
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
                      onChangeText={handleChange('client')}
                      onBlur={handleBlur('client')}
                      value={String(values.client)}
                      returnKeyType="next"
                    />

                    <Description>Desconto: </Description>
                    <Input
                      autoCorrect={false}
                      placeholder="Desconto"
                      keyboardType="numeric"
                      onChangeText={handleChange('discounts')}
                      onBlur={handleBlur('discounts')}
                      value={String(values.discounts)}
                      returnKeyType="next"
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

                    <Description>Usuário: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Usuário"
                      onChangeText={handleChange('user')}
                      onBlur={handleBlur('user')}
                      value={String(values.user)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />

                    <Description>Valor: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Valor"
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

                    <Description>Total: </Description>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="characters"
                      placeholder="Total"
                      onChangeText={handleChange('total')}
                      onBlur={handleBlur('total')}
                      value={String(values.total)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                    <ButtonDetail onPress={handleSubmit}>Salva Edições</ButtonDetail>

                  </>
                );
              }}
            </Formik>
          </Sales>

        </ScrollView>
        </KeyboardAvoidingView>
      </Container>
      <ItemContainer />

    </>
  );
}
