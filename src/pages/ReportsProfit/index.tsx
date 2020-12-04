import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, View, Alert } from 'react-native';
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
      return (
        Alert.alert('Erro', 'Data não encontrada')
      )
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{flex:1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Container>

            <DateInput
            placeholder="Data inicial"
              icon="clock"
              value={initial_date}
              handleChange={setInitial_date}
            />
            <DateInput
            placeholder="Data final"
              icon="clock-o"
              value={end_date}
              handleChange={setEnd_date}
            />

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
        </ScrollView>
      </KeyboardAvoidingView>

    </>
  );
}
