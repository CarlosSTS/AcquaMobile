import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeCarboyLoan from '../pages/HomeCarboyLoan';
import CarboyLoanCreate from '../pages/CarboyLoanCreate';
import CarboyLoanCreated from '../pages/CarboyLoanCreated';
import CarboyLoanDetail from '../pages/CarboyLoanDetail';

const CarboyLoanStack = createStackNavigator();

const CarboyLoanStackRoutes: React.FC = () => (
  <CarboyLoanStack.Navigator
    screenOptions={{
      headerShown: true,
      headerTintColor: '#fff',

      headerStyle: {
        backgroundColor: '#3d9be9',
      },
    }}
  >
    <CarboyLoanStack.Screen name="Empréstimos" component={HomeCarboyLoan} />
    <CarboyLoanStack.Screen name="CarboyLoanCreate" component={CarboyLoanCreate}

      options={{
        headerShown: true,
      title: "Cadastrar empréstimo" }}
    />
    <CarboyLoanStack.Screen
      options={{ title: 'Empréstimos Registrados' }}
      name="CarboyLoanCreated"
      component={CarboyLoanCreated}
    />
    <CarboyLoanStack.Screen
      options={{ headerShown: false }}
      name="CarboyLoanDetail"
      component={CarboyLoanDetail}
    />
  </CarboyLoanStack.Navigator>
);

export default CarboyLoanStackRoutes;
