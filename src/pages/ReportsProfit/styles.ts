import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1px;
  background-color: #fafafa;
  padding: 24px 24px ${Platform.OS === 'android' ? 8 : 40}px;
`;

export const ContainerList = styled.View`
  background-color: #fff;
  border-width: 1px;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const ProfitTitle = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  color: #333;
`;

export const ProfitDescription = styled.Text`
  font-size: 16px;
  color: #999;
  margin-top: 5px;
  line-height: 24px;
`;
