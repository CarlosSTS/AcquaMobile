import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import api from '../../services/index';
import InputText from '../../components/InputText';
import DateInput from '../../components/DateInput';
import RemoteSelect from '../../components/RemoteSelect';
import Button from '../../components/Button'
import { Container, ErrorValue } from './styles';
/*
interface SaleFormData {
  submit_date: string;
  quantity: Number;
  value: Number;
  client: Number;
  obs: string;
}
*/

const initialValues: any = {
  submit_date: moment().format('YYYY-MM-DD'),
  quantity: '',
  value: '',
  obs: '',
  client: '',
};

const schema = Yup.object().shape({
  quantity: Yup.number().required('Informe uma quantidade').min(1),
  value: Yup.number().required('Informe um valor unitàrio').min(0.1),
  client: Yup.number().required('Selecione um cliente'),
  obs: Yup.string(),
  submit_date: Yup.string().required('Informe uma data'),
});

const SaleCreate: React.FC = () => {
  const navigation = useNavigation();
  const [clients, setClients] = useState([]);

  const quantityRef = useRef<TextInput>(null)
  const valueRef = useRef<TextInput>(null)
  const obsRef = useRef<TextInput>(null)
  const submitDateRef = useRef<TextInput>(null)

  const onSubmit = (values: any) => {
    try {
      api.post('/sales/', values);
      Alert.alert('Sucesso!', 'venda registrada!');
      navigation.navigate('SaleCreated');
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
                    initialLabel="Selecione um cliente"
                    onSelectChange={handleChange('client')}
                    data={clients}
                    labelField="full_name"
                    valueField="id"
                  />


                  {errors.client && <ErrorValue>{errors.client}</ErrorValue>}
                  <InputText
                    icon="shopping-cart"
                    onChangeText={handleChange('quantity')}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      valueRef.current?.focus()
                    }}
                    onBlur={handleBlur('quantity')}
                    placeholder="quantidade"
                    value={String(values.quantity)}
                  />

                  {errors.quantity && <ErrorValue>{errors.quantity}</ErrorValue>}

                  <InputText
                    ref={valueRef}
                    icon="dollar-sign"
                    returnKeyType="next"

                    onChangeText={handleChange('value')}
                    keyboardType="numeric"
                    onBlur={handleBlur('value')}
                    placeholder="valor unitário"
                    value={String(values.value)}
                    onSubmitEditing={() => {
                      obsRef.current?.focus();
                    }}
                  />

                  {errors.value && <ErrorValue>{errors.value}</ErrorValue>}

                  <InputText
                    ref={obsRef}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    keyboardType="default"
                    icon="alert-circle"
                    onChangeText={handleChange('obs')}
                    onBlur={handleBlur('obs')}
                    placeholder="Observação"
                    value={values.obs}
                  />

                  <DateInput
                    icon="clock"
                    value={values.submit_date}
                    handleChange={handleChange('submit_date')}
                  />

                  <Button onPress={handleSubmit}>Rigistrar</Button>

                </>
              )}
            </Formik>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};


export default SaleCreate;
