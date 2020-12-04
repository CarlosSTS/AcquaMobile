import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Alert } from 'react-native';
import uniqBy from 'lodash/uniqBy';
import api from '../../services/index';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from "react-native-gesture-handler";
import {
  Container,
  LoanList,
  Loan,
  LoanProperty,
  LoanValue,
  DetailsButton,
  DetailsButtonText,
  Header,
  HeaderText,
} from './styles';
import RemoteSelect from '../../components/RemoteSelect';

interface ClientData {
  id: number;
  full_name: string;
  phone: string;
}

interface LoanFormData {
  id: number;
  quantity: number;
  value: number;
  obs: string;
  submit_date: any;
  client: ClientData;
}

interface DateProps {
  startDate: Date;
  endDate: Date;
}

const humanDate = (date: any) => {
  return date.format('DD/MM/YYYY');
};

const makeResponseData = (data: Array<object>) =>
  data.map((item: any) => {
    item.submit_date = moment(item.submit_date);
    return item;
  });

export default function CarboyLoanCreated() {
  const [loans, setLoans] = useState<LoanFormData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [client, setClient] = useState('');
  const [clients, setClients] = useState([]);

  const navigation = useNavigation();

  function navigateToDetail(id: number, full_name: string, phone: string) {
    navigation.navigate('CarboyLoanDetail', { id, full_name,phone });
  }

  function loadLoans() {
    api
      .get('/loans/', {
        params: { page },
      })
      .then((response) => {
        setLoans(makeResponseData(response.data));
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
      });
  }

  const onClientChange = (value: string) => {
    setClient(value);
  };

  const getClientData = () => {
    api
      .get('/clients/', { params: { limit: 1000 } })
      .then((response) => setClients(response.data))
      .catch((error) => Alert.alert('Fracasso','Contate o administrador do sistema.'));
  };

  const onEndReached = () => {
    if (loading) {
      return;
    }
    if (Number(total) > 0 && Number(loans.length) === Number(total)) {
      return;
    }
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);

    api
      .get('/loans/', {
        params: { page, ...filterParams },
      })
      .then((response) => {
        const resData = makeResponseData(response.data);
        const data = uniqBy([...loans, ...resData], 'id');
        setLoans(data);
        setTotal(response.headers['x-total-count']);
        setLoading(false);
      });
  }, [page, filterParams]);

  useEffect(() => {
    loadLoans();
  }, []);

  useEffect(() => {
    getClientData();
  }, []);

  function navigateToHomeCarboyLoan() {
    navigation.navigate('HomeCarboyLoan')
  }
  return (
    <>
     <Header style={{ shadowColor: '#000', elevation: 8, }}>
        <RectButton>
          <FeatherIcon onPress={navigateToHomeCarboyLoan} name="arrow-left" color="#fff" size={24} />
        </RectButton>
        <HeaderText>Empréstimos registrados</HeaderText>
        <FeatherIcon name="arrow-left" color="#3d9be9" size={24} />
      </Header>

    <Container>

      <LoanList
        data={loans}
        keyExtractor={(loan) => String(loan.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={({ item: loan }) => (
          <Loan>
            <LoanProperty>ID e cliente:</LoanProperty>
            <LoanValue>
              {loan.id}-{loan.client.full_name}
            </LoanValue>

            <LoanProperty>Data:</LoanProperty>
            <LoanValue>{humanDate(loan.submit_date)}</LoanValue>

            <LoanProperty>Quantidade:</LoanProperty>
            <LoanValue>{loan.quantity}</LoanValue>

            <LoanProperty>Obs:</LoanProperty>
            <LoanValue>{loan.obs}</LoanValue>

            <DetailsButton onPress={() => navigateToDetail(loan.id, loan.client.full_name, loan.client.phone)}>
              <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
              <Icon name="arrow-right" size={16} color="#E02041" />
            </DetailsButton>
          </Loan>
        )}
      />
    </Container>
    </>
  );
}
