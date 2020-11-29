import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import api from '../../services/index';
import Button from '../../components/Button';
import DateInput from '../../components/DateInput';

import {
  Container,
  ContainerList,
  ProfitTitle,
  ProfitDescription,
} from './styles';

interface ProfitFormData {
  entry_sum: number;
  out_sum: number;
  profit: number;
}

export default function ReportsProfit() {
  const [initial_date, setInitial_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [profit, setProfit] = useState<ProfitFormData>();

  async function loadProfit() {
    try {

    const response = await api.get('/moves/report/', {
      params: { initial_date, end_date },
    });

    setProfit(response.data);
  } catch {
    Alert.alert('Erro', 'Data não encontrada ')
  }}

  return (
    <>
      <Container>
        <DateInput
          icon="clock"
          value={initial_date}
          handleChange={setInitial_date}
        />
        <DateInput icon="clock-o" value={end_date} handleChange={setEnd_date} />
        <Button onPress={loadProfit}>Acessar</Button>
        <View style={{ paddingTop: 16 }} />
        <ContainerList>
          <ProfitTitle>Veja Seus Lucros:</ProfitTitle>
          <ProfitDescription>
            Soma de entrada:
            {profit?.entry_sum ? profit?.entry_sum : 0}
          </ProfitDescription>
          <ProfitDescription>
            Soma de Saida:
            {profit?.out_sum ? profit.out_sum : 0}
          </ProfitDescription>
          <ProfitDescription>
            Lucro:
            {profit?.profit ? profit.profit : 0}
          </ProfitDescription>
        </ContainerList>
      </Container>
    </>
  );
}
