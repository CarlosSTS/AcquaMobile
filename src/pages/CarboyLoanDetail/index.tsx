import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Input,
  Description,
  Loans,
} from './styles';
import api from '../../services';
import ItemContainer from '../../components/ItemContainer'
import ButtonDetail from '../../components/ButtonDetail'

interface loansRouteParams {
  id: number;
}
interface loansDetail {
  // accept_date
  // status
  client: number;
  quantity: number;
  user: number;
  obs: string;
}

const initialValues: loansDetail = {
  client: 0,
  quantity: 0,
  user: 0,
  obs: '',
};

const schema = Yup.object().shape({
  obs: Yup.string().required('Campo obrigatório'),
});

export default function CarboyLoanDetail() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as loansRouteParams;
  const [loans, setLoans] = useState<loansDetail>(initialValues);

  useEffect(() => {
    api.get(`/loans/${params.id}/`).then((response) => {
      setLoans({ ...loans, ...response.data });
    });
  }, [params.id]);

  const updateloans = (values: object) => {
    try {
      api.patch(`/loans/${params.id}/`, values);
      Alert.alert('sucesso!', 'empréstimo atualizado');
    } catch {
      Alert.alert('fracasso!', 'contate o administrador do sistema');
    }
  };

  return (
    <>
      <Container>


        <ScrollView showsVerticalScrollIndicator={false}>
          <Loans>
            <Formik
              initialValues={loans}
              enableReinitialize
              onSubmit={updateloans}
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
          <ButtonDetail onPress={handleSubmit}>Salvar Edições</ButtonDetail>

                  </>
                );
              }}
            </Formik>
          </Loans>

        </ScrollView>
      </Container>
      <ItemContainer />
    </>
  );
}
