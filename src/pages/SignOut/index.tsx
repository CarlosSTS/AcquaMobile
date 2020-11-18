import React from 'react';
import { SafeAreaView, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

const SignOut: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <Button title="Sair" onPress={signOut} />
    </SafeAreaView>
  );
};
export default SignOut;
