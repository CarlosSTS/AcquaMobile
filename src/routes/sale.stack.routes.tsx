import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeSale from '../pages/HomeSale'
import SaleCreate from '../pages/SaleCreate'
import SaleCreated from '../pages/SaleCreated';
import SaleDetail from '../pages/SaleDetail';

const SaleStack = createStackNavigator();

const SaleStackRoutes: React.FC = () => (
  <SaleStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#3d9be9",
      },
    }}
  >
    <SaleStack.Screen name="Vendas" component={HomeSale} />
    <SaleStack.Screen
      options={{
        cardStyle: { backgroundColor: '#3d9be9' },
        headerShown: true,
        title: "Registar venda"
      }}
      name="SaleCreate"
       component={SaleCreate}
        />
    <SaleStack.Screen name="SaleCreated" component={SaleCreated}
     options={{
       title: "Vendas Registradas"
        }}
         />
    <SaleStack.Screen name="SaleDetail" component={SaleDetail}
     options={{
      headerBackTitleVisible: false,
      title: "Editar Venda",
      headerShown: true
    }}
    />

  </SaleStack.Navigator>
);

export default SaleStackRoutes;
