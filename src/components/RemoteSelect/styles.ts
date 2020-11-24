import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';


export const ContainerRemoteButtonText = styled.View`
  width: 100%;
  height: 60px;
  background: #eee;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #000;

  flex-direction: row;
  align-items: center;
`;
export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
