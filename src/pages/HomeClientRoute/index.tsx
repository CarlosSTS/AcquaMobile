import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonDetail from '../../components/ButtonDetail'

import {
  ContainerList,
  RoutesDescription,
  RoutesTitle,
  Container,
} from './styles';

const HomeClientRoute : React.FC = () => {
const navigation = useNavigation();

function navigationCreateRouteClient() {
  navigation.navigate('CreateRouteClient')
}

function navigationCreatedRouteClient() {
  navigation.navigate('CreatedRouteClient')
}

  return (
    <>

      <Container>
      <ContainerList>
          <RoutesTitle>Cadastrar Rota de Clientes.</RoutesTitle>
          <RoutesDescription>Acesse para registrar Rota de clientes. </RoutesDescription>
          <ButtonDetail onPress={navigationCreateRouteClient}>Acessar</ButtonDetail>

        </ContainerList>

        <ContainerList>
          <RoutesTitle>Rota de Clientes Registradas.</RoutesTitle>
          <RoutesDescription>Acesse para ver rota de clientes registradas.</RoutesDescription>
          <ButtonDetail onPress={navigationCreatedRouteClient}>Acessar</ButtonDetail>

        </ContainerList>

      </Container>

    </>
  )}
export default HomeClientRoute;
