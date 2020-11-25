import React from "react";
import { useNavigation } from "@react-navigation/native";
import {View} from 'react-native';
import {
  ContainerList,
  RoutesDescription,
  RoutesTitle,
  Container,
} from './styles';
import ButtonDetail from '../../components/ButtonDetail'

const HomeReports: React.FC = () => {
  const navigation = useNavigation();

  function navigationReportsStackRoutes() {
    navigation.navigate('ReportsRoutes')
  }

  function navigationReportsProfit() {
    navigation.navigate('ReportsProfit')
  }

  return (
    <>

      <Container>
        <ContainerList>
          <RoutesTitle>Relatório de Rotas.</RoutesTitle>
          <RoutesDescription>Acesse para mais detalhes.</RoutesDescription>
          <ButtonDetail onPress={navigationReportsStackRoutes}>Acessar</ButtonDetail>

        </ContainerList>

        <ContainerList>
          <RoutesTitle>Relatório de Lucro.</RoutesTitle>
          <RoutesDescription>Acesse para mais detalhes.</RoutesDescription>
          <ButtonDetail onPress={navigationReportsProfit}>Acessar</ButtonDetail>

        </ContainerList>

      </Container>

    </>
  )
}
export default HomeReports;
