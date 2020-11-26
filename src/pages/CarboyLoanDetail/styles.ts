import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container= styled.View`
  margin: 8px;
  flex: 1;
  padding: 0 8px ${Platform.OS === 'android' ? 8 : 40}px;
`;

  export const Input = styled.TextInput`
 font-size: 15px;
 margin-bottom: 8px;
color: #737373;
font-family: 'RobotoSlab-Medium';
  `;
export const Description = styled.Text`
font-family: 'RobotoSlab-Medium';
font-size: 16px;
color: #4169b3;
`;

export const Loans = styled.View`
padding: 24px;
border-radius: 8px;
background-color: #fff;
margin-bottom: 16px;
margin-top: 20px;
`;
