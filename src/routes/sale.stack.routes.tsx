import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeSale from '../pages/HomeSale'
import SaleCreate from '../pages/SaleCreate'
import SaleCreated from '../pages/SaleCreated';
import SaleDetail from '../pages/SaleDetail';
import { Title } from '../pages/SignIn/styles';
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
    <SaleStack.Screen name="HomeSale" component={HomeSale}
     options={{title: 'Vendas'}}
      />
    <SaleStack.Screen name="SaleCreate" component={SaleCreate}
      options={{
        cardStyle: { backgroundColor: '#3d9be9' },
        headerShown: true,
        title: "Registar venda"
      }}
    />
    <SaleStack.Screen name="SaleCreated" component={SaleCreated}
      options={{headerShown: false }}
    />
    <SaleStack.Screen name="SaleDetail" component={SaleDetail}
      options={{headerShown: false }}
    />

  </SaleStack.Navigator>
);

export default SaleStackRoutes;
