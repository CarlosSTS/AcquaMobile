import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeCarboyLoan from '../pages/HomeCarboyLoan';
import CarboyLoanCreate from '../pages/CarboyLoanCreate';
import CarboyLoanCreated from '../pages/CarboyLoanCreated';
import CarboyLoanDetail from '../pages/CarboyLoanDetail';
import ItemContainer from '../components/ItemContainer';

const CarboyLoanStack = createStackNavigator();

const CarboyLoanStackRoutes: React.FC = () => (
  <CarboyLoanStack.Navigator
    screenOptions={{
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#3d9be9',
      },
    }}
  >
    <CarboyLoanStack.Screen name="Empréstimos" component={HomeCarboyLoan} />
    <CarboyLoanStack.Screen name="CarboyLoanCreate" component={CarboyLoanCreate}

      options={{
        cardStyle: { backgroundColor: '#3d9be9' },
        title: "Cadastrar empréstimo"
      }}
    />
    <CarboyLoanStack.Screen name="CarboyLoanCreated" component={CarboyLoanCreated}
      options={{  title: 'Empréstimos Registrados'}}

    />
    <CarboyLoanStack.Screen name="CarboyLoanDetail"
      component={CarboyLoanDetail}
      options={{ title: "Editar empréstimo" }}
    />

<CarboyLoanStack.Screen name="ItemContainer" component={ItemContainer}
     options={{
      headerBackTitleVisible: false,
      title: "Container de detalhes",
      headerShown: true
    }}
    />
  </CarboyLoanStack.Navigator>
);

export default CarboyLoanStackRoutes;
