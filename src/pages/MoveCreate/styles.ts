import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 0 : 40}px;
`;

export const ErrorValue = styled.Text`
background-color: #e02040;
color: #fff;
font-size: 16px;
width: 100%;

`;

