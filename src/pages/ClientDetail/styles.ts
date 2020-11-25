import styled from 'styled-components/native';
import { Platform } from 'react-native';
//15c3d6 ,41aef4,3d9be9,15B6D6
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin: 8px;
  flex: 1;
  padding: 0 8px ${Platform.OS === 'android' ? 8 : 40}px;
`;

export const Input = styled.TextInput`
margin-top: 8px;
font-size: 15px;
margin-bottom: 24px;
color: #737373;
font-family: 'RobotoSlab-Medium';
  `;
export const Description = styled.Text`
font-family: 'RobotoSlab-Medium';
font-size: 14px;
color: #4169b3;
font-weight: bold;
`;

export const Clients = styled.View`
padding: 24px;
border-radius: 8px;
background-color: #fff;
margin-bottom: 16px;
margin-top: 48px;
`;





