import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const RoutesButton = styled(RectButton)`
height: 42px;
border-radius: 5px;
border-width: 2px;
border-color: #ff9000;

background-color: #ff9000;
justify-content: center;
align-items: center;
margin-top: 10px;
`;

export const RoutesButtonText= styled.Text`
font-size: 16px;
color: #000;
font-family: 'RobotoSlab-Regular';
`;
