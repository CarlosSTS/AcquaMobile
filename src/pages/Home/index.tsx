import React from 'react';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ContainerList,
  RoutesDescription,
  RoutesTitle,
} from './styles';
import ButtonDetail from '../../components/ButtonDetail'

const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>

      <ContainerList>
        <RoutesTitle>Sair da Aplicação 😔.</RoutesTitle>
        <RoutesDescription>Acesse para sair da Aplicação.</RoutesDescription>
        <ButtonDetail onPress={signOut}>Acessar</ButtonDetail>
      </ContainerList>

    </Container>
  )
};
export default Home;
