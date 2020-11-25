import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ContainerList,
  RoutesDescription,
  RoutesTitle,
  Container,
} from './styles';
import ButtonDetail from '../../components/ButtonDetail'

const HomePurchase : React.FC = () => {
const navigation = useNavigation();

function navigationPurchaseCreate() {
  navigation.navigate('PurchaseCreate')
}

function navigationPurchaseCreated() {
  navigation.navigate('PurchaseCreated')
}

  return (
    <>

      <Container>
      <ContainerList>
          <RoutesTitle>Cadastrar Compras.</RoutesTitle>
          <RoutesDescription>Acesse para registrar compras.</RoutesDescription>
          <ButtonDetail onPress={navigationPurchaseCreate}>Acessar</ButtonDetail>

        </ContainerList>

        <ContainerList>
          <RoutesTitle>Compras Registradas.</RoutesTitle>
          <RoutesDescription>Acesse para ver compras registradas.</RoutesDescription>
          <ButtonDetail onPress={navigationPurchaseCreated}>Acessar</ButtonDetail>

        </ContainerList>

      </Container>

    </>
  )}
export default HomePurchase;
