import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonDetail from '../../components/ButtonDetail'

import {
  ContainerList,
  RoutesDescription,
  RoutesTitle,
  Container,
} from './styles';

const HomeCarboyLoan : React.FC = () => {
const navigation = useNavigation();

function navigationCarboyLoanCreate() {
  navigation.navigate('CarboyLoanCreate')
}

function navigationCarboyLoanCreated() {
  navigation.navigate('CarboyLoanCreated')
}

  return (
    <>

      <Container>
      <ContainerList>
          <RoutesTitle>Cadastrar Empréstimos.</RoutesTitle>
          <RoutesDescription>Acesse para registrar empréstimos. </RoutesDescription>
          <ButtonDetail onPress={navigationCarboyLoanCreate}>Acessar</ButtonDetail>
        </ContainerList>

        <ContainerList>
          <RoutesTitle>Empréstimos Registrados.</RoutesTitle>
          <RoutesDescription>Acesse para ver empréstimos registrados.</RoutesDescription>
          <ButtonDetail onPress={navigationCarboyLoanCreated}>Acessar</ButtonDetail>

        </ContainerList>

      </Container>

    </>
  )}
export default HomeCarboyLoan;
