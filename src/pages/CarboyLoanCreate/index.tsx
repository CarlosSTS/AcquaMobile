import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/index';
import InputText from '../../components/InputText';
import {
  Container,
  ErrorValue,
  ContainerRemoteButtonText,
} from './styles';
import DateInput from '../../components/DateInput';
import RemoteSelect from '../../components/RemoteSelect';
import Button from '../../components/Button'
import { ScrollView } from 'react-native-gesture-handler';
/*
interface CarboyLoanFormData {
  order_date: string;
  quantity: Number;
  client: Number;
  obs: string;
}
*/

const initialValues: any = {
  order_date: moment().format('YYYY-MM-DD'),
  quantity: '',
  obs: '',
  client: '',
};

const schema = Yup.object().shape({
  quantity: Yup.number().required('Campo obrigatório').min(1),
  client: Yup.number().required('Cliente é obrigatório'),
  obs: Yup.string(),
  order_date: Yup.string().required('obrigatório definir data'),
});

const CarboyLoanCreate: React.FC = () => {
  const [clients, setClients] = useState([]);
  const navigation = useNavigation();
  const onSubmit = (values: any) => {
    try {
      api.post('/loans/', values);
      Alert.alert('Sucesso!', 'empréstimo registrado!');
      navigation.navigate('CarboyLoanCreated');
    } catch {
      Alert.alert('Fracasso!', 'contate o administrador do sistema');
    }
  };

  const getClientData = () => {
    api
      .get('/clients/', { params: { limit: 1000 } })
      .then((response) => setClients(response.data))
      .catch(() => Alert.alert('Fracasso'));
  };

  useEffect(() => {
    getClientData();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}>
            <Container>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                  <RemoteSelect
                    onSelectChange={handleChange('client')}
                    data={clients}
                    labelField="full_name"
                    valueField="id"
                    initialLabel="Selecione um cliente"
                  />

                {errors.client && <ErrorValue>{errors.client}</ErrorValue>}
                <InputText
                  keyboardType="numeric"
                  icon="shopping-cart"
                  onChangeText={handleChange('quantity')}
                  onBlur={handleBlur('quantity')}
                  placeholder="quantidade"
                  value={String(values.quantity)}
                />

                {errors.quantity && <ErrorValue>{errors.quantity}</ErrorValue>}

                <InputText
                  keyboardType="default"
                  icon="alert-circle"
                  onChangeText={handleChange('obs')}
                  onBlur={handleBlur('obs')}
                  placeholder="Observação"
                  value={values.obs}
                />

                <DateInput
                  icon="clock"
                  value={values.order_date}
                  handleChange={handleChange('order_date')}
                />

                  <Button  onPress={handleSubmit}>Registrar</Button>
              </>
            )}
          </Formik>
        </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};


export default CarboyLoanCreate;
