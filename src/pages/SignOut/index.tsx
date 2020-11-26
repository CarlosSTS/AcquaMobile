import React from 'react';

import AuthRoutes from '../../routes/auth.routes'
import { useAuth } from '../../hooks/auth';

const SignOut: React.FC = () => {
  const { user, signOut } = useAuth();

  if(user){
    signOut()
 }


return <AuthRoutes />


};
export default SignOut;
