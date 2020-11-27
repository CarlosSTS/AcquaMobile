import styled from 'styled-components/native';
import {Platform} from 'react-native';
//15c3d6 ,41aef4,3d9be9,15B6D6
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 0 : 40}px;
`;

export const ErrorValue = styled.Text`
background-color: #f00;
color: #fff;
font-size: 16px;
width: 100%;
`;
