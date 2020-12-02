import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { FlatList,RectButton } from 'react-native-gesture-handler';

interface ClientData {
  id: number;
  full_name: string;
  phone: string;
}

interface PathFormData {
  id: number;
  quantity: number;
  value: number;
  obs: string;
  submit_date: any;
  client: ClientData;
}

export const Container = styled.SafeAreaView`
  margin: 20px;
  flex: 1;
  padding: 0 24px ${Platform.OS === 'android' ? 8 : 40}px;
`;

export const PathList = styled(FlatList as new () => FlatList<PathFormData>)`
margin-top:32px;
`;

export const Path = styled.View`
padding: 24px;
border-radius:8px;
background-color: #FFF;
margin-bottom: 16px;
`;

export const PathProperty = styled.Text`
font-family: 'RobotoSlab-Medium';
font-size: 14px;
color: #4169b3;
font-weight: bold;
`;

export const PathValue = styled.Text`
font-family: 'RobotoSlab-Medium';
margin-top: 8px;
font-size: 15px;
margin-bottom: 24px;
color: #737373;
`;

export const DetailsButton = styled(RectButton)`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const DetailsButtonText = styled.Text`
font-family: 'RobotoSlab-Medium';
color: #e02041;
font-size:15px;
font-weight:bold;
`;
export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
height: 55px;

color: #fff;
background-color: #3d9be9;
`;
export const HeaderText = styled.Text`
font-size: 20px;
font-weight:bold;
align-items:center;
justify-content:center;
color: #fff;
`;
