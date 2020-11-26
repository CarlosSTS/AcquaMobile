import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonDetail from '../../components/ButtonDetail'

import {
  Container,
  ContainerList,
  RoutesDescription,
  RoutesTitle,
} from './styles';

const ClientHome : React.FC = () => {
const navigation = useNavigation();

function navigationClientCreate() {
  navigation.navigate('ClientCreate')
}

function navigationClientCreated() {
  navigation.navigate('ClientCreated')
}

  return (
    <>

      <Container>
      <ContainerList>
          <RoutesTitle>Cadastrar Cliente.</RoutesTitle>
          <RoutesDescription>Acesse para registrar clientes.</RoutesDescription>
          <ButtonDetail onPress={navigationClientCreate}>Acessar</ButtonDetail>

        </ContainerList>

        <ContainerList>
          <RoutesTitle>Clientes Cadastrados.</RoutesTitle>
          <RoutesDescription>Acesse para ver clientes registrados.</RoutesDescription>
          <ButtonDetail onPress={navigationClientCreated}>Acessar</ButtonDetail>

        </ContainerList>
      </Container>

    </>
  )}
export default ClientHome;
