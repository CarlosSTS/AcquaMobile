import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from '../../routes/auth.routes'
import { useAuth } from '../../hooks/auth';

const SignOut: React.FC = () => {
  const { user, signOut,loading} = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if(user){
    signOut()
 }

return <AuthRoutes />

};
export default SignOut;
