import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePurchase from '../pages/HomePurchase'
import PurchaseCreate from "../pages/PurchaseCreate";
import PurchaseCreated from '../pages/PurchaseCreated';
import PurchaseDetail from '../pages/PurchaseDetail';

const PurchaseStack = createStackNavigator();

const PurchaseStackRoutes: React.FC = () => (
  <PurchaseStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "#3d9be9",

      },
    }}
  >
    <PurchaseStack.Screen name="HomePurchase" options={{title: "Compras"}} component={HomePurchase} />

    <PurchaseStack.Screen
      name="PurchaseCreate"
      component={PurchaseCreate}
      options={{
        cardStyle:{ backgroundColor: '#3d9be9' },
        title: "Registrar compra",
        headerShown: true ,
      }}
    />
    <PurchaseStack.Screen
    name="PurchaseCreated"
     component={PurchaseCreated}
     options={{title: "Compras Registradas"}}
     />

    <PurchaseStack.Screen
      name="PurchaseDetail"
      component={PurchaseDetail}
      options={{
        title: "Editar compra"

      }}
      />

  </PurchaseStack.Navigator>
);

export default PurchaseStackRoutes;
