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
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#3d9be9',
      },
    }}
  >
    <CarboyLoanStack.Screen name="HomeCarboyLoan" component={HomeCarboyLoan}
     options={{title: "Empréstimos"}}
     />
    <CarboyLoanStack.Screen name="CarboyLoanCreate" component={CarboyLoanCreate}
      options={{
        cardStyle: { backgroundColor: '#3d9be9' },
        title: "Cadastrar empréstimo"
      }}
    />
    <CarboyLoanStack.Screen name="CarboyLoanCreated" component={CarboyLoanCreated}
      options={{  headerShown:false}}
    />
    <CarboyLoanStack.Screen name="CarboyLoanDetail" component={CarboyLoanDetail}
      options={{ headerShown: false }}
    />

  </CarboyLoanStack.Navigator>
);

export default CarboyLoanStackRoutes;
