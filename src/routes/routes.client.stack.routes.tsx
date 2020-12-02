import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeClientRoute from '../pages/HomeClientRoute';
import CreateRouteClient from '../pages/ClientRouteCreate';
import CreatedRouteClient from '../pages/ClientRouteCreated';
import ClientRouteDetail from '../pages/ClientRouteDetail';

const ClientRouteStack = createStackNavigator();

const ClientRouteStackRoutes: React.FC = () => (
  <ClientRouteStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#3d9be9',
      },
    }}
  >
    <ClientRouteStack.Screen name="HomeClientRoute" component={HomeClientRoute}
      options={{ title: "Rota de Clientes" }}
    />
    <ClientRouteStack.Screen name="CreateRouteClient" component={CreateRouteClient}
      options={{
        title: 'Registrar rota de cliente',
        cardStyle: { backgroundColor: '#3d9be9' },
      }}
    />
    <ClientRouteStack.Screen name="CreatedRouteClient" component={CreatedRouteClient}
      options={{ headerShown: false }}
    />
    <ClientRouteStack.Screen name="ClientRouteDetail" component={ClientRouteDetail}
      options={{ headerShown: false }} />

  </ClientRouteStack.Navigator>
);

export default ClientRouteStackRoutes;
