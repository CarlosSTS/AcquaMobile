import React from "react";
import { View, Button } from "react-native";

import { useAuth } from "../../hooks/auth";

const SignOut: React.FC = () => {
  const { signOut } = useAuth();

  return <Button  title="Sair" onPress={signOut} />
};
export default SignOut;
