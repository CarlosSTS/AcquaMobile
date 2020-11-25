import React from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonDetail from '../../components/ButtonDetail'

import {
  ContainerList,
  RoutesDescription,
  RoutesTitle,
  Container,
} from './styles';

const HomeMove : React.FC = () => {
const navigation = useNavigation();

function navigationMoveCreate() {
  navigation.navigate('MoveCreate')
}

function navigationMoveCreated() {
  navigation.navigate('MoveCreated')
}

  return (
    <>

      <Container>
      <ContainerList>
          <RoutesTitle>Cadastrar Movimentos.</RoutesTitle>
          <RoutesDescription>Acesse para registrar movimento. </RoutesDescription>
          <ButtonDetail onPress={navigationMoveCreate}>Acessar</ButtonDetail>

        </ContainerList>

        <ContainerList>
          <RoutesTitle>Movimentos registrados.</RoutesTitle>
          <RoutesDescription>Acesse para ver movimentos registrados.</RoutesDescription>
          <ButtonDetail onPress={navigationMoveCreated}>Acessar</ButtonDetail>

        </ContainerList>

      </Container>

    </>
  )}
export default HomeMove;
