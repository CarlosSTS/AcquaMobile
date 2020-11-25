import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeClient from '../pages/HomeClient';
import ClientCreate from '../pages/ClientCreate';
import ClientCreated from '../pages/ClientCreated';
import ClientDetail from '../pages/ClientDetail';
import ItemContainer from '../components/ItemContainer';

const ClientStack = createStackNavigator();

const ClientStackRoutes: React.FC = () => (
  <ClientStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#3d9be9',

      },
    }}
  >
    <ClientStack.Screen name="Clientes"  component={HomeClient} />

    <ClientStack.Screen
      name="ClientCreate"
      component={ClientCreate}
      options={{
        cardStyle:{ backgroundColor: '#3d9be9' },

        title: 'Cadastrar cliente',
        headerBackTitleVisible: false,
      }}
    />

    <ClientStack.Screen
      name="ClientCreated"
      component={ClientCreated}
      options={{
        title: 'Clientes Registrados',
        headerBackTitleVisible: false,
      }}
    />

    <ClientStack.Screen
      name="ClientDetail"
      component={ClientDetail}
      options={{
        title: 'Editar cliente',
        headerBackTitleVisible: false,
      }}
    />
<ClientStack.Screen name="ItemContainer" component={ItemContainer}
     options={{
      headerBackTitleVisible: false,
      title: "Container de detalhes",
      headerShown: true
    }}
    />

  </ClientStack.Navigator>
);

export default ClientStackRoutes;
