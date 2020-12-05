import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Alert } from 'react-native';
import uniqBy from 'lodash/uniqBy';
import api from '../../services/index';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from "react-native-gesture-handler";
import RemoteSelect from '../../components/RemoteSelect';
import {
  Container,
  SaleList,
  Sales,
  SaleProperty,
  SaleValue,
  DetailsButton,
  DetailsButtonText,
  Header,
  HeaderText,
} from './styles';

interface ClientData {
  id: number;
  full_name: string;
  phone: string;
}

interface SaleFormData {
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

export default function SaleCreated() {
  const [sales, setSales] = useState<SaleFormData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [client, setClient] = useState('');
  const [clients, setClients] = useState([]);

  const navigation = useNavigation();

  function navigateToDetail(id: number, full_name: string, phone: string) {
    navigation.navigate('SaleDetail', { id, full_name, phone });
  }

  function loadSales() {
    api
      .get('/sales/', {
        params: { page },
      })
      .then((response) => {
        setSales(makeResponseData(response.data));
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
    if (Number(total) > 0 && Number(sales.length) === Number(total)) {
      return;
    }
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);

    api
      .get('/sales/', {
        params: { page, ...filterParams },
      })
      .then((response) => {
        const resData = makeResponseData(response.data);
        const data = uniqBy([...sales, ...resData], 'id');
        setSales(data);
        setTotal(response.headers['x-total-count']);
        setLoading(false);
      });
  }, [page, filterParams]);

  useEffect(() => {
    loadSales();
  }, []);

  useEffect(() => {
    getClientData();
  }, []);

  function navigateToHomeSale() {
    navigation.navigate('HomeSale')
  }

  return (
    <>

<Header style={{ shadowColor: '#000', elevation: 8, }}>
        <RectButton>
          <FeatherIcon  style={{paddingLeft: 12}} onPress={navigateToHomeSale} name="arrow-left" color="#fff" size={24} />
        </RectButton>
        <HeaderText style={{paddingRight:12}}>Vendas registradas</HeaderText>
        <FeatherIcon name="arrow-left" color="#3d9be9" size={24} />

      </Header>

    <Container>

      <SaleList
        data={sales}
        keyExtractor={(sale) => String(sale.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        renderItem={({ item: sales }) => (
          <Sales>
            <SaleProperty>ID e cliente:</SaleProperty>
            <SaleValue>{sales.client.full_name}</SaleValue>

            <SaleProperty>Data:</SaleProperty>
            <SaleValue>{humanDate(sales.submit_date)}</SaleValue>

            <SaleProperty>Quantidade:</SaleProperty>
            <SaleValue>{sales.quantity}</SaleValue>

            <SaleProperty>Valor Unitário:</SaleProperty>
            <SaleValue>{sales.value}</SaleValue>

            <SaleProperty>total:</SaleProperty>
            <SaleValue>{sales.quantity * sales.value}</SaleValue>

            <DetailsButton onPress={() => navigateToDetail(sales.id, sales.client.full_name,sales.client.phone)}>
              <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
              <Icon name="arrow-right" size={16} color="#E02041" />
            </DetailsButton>
          </Sales>
        )}
      />
    </Container>
    </>
  );
}
