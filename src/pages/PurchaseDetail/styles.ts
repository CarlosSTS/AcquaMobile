import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin: 20px;
  flex: 1;
  padding: 0 8px ${Platform.OS === 'android' ? 8 : 40}px;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
export const Description = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #4169b3;
  font-weight: bold;
`;

export const Shoppings = styled.View`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 16px;
  margin-top: 48px;
`;


