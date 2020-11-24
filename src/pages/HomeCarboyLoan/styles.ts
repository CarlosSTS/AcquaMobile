import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
flex: 1px;
background-color: #fafafa;
padding: 20px;
`;

  export const ContainerList = styled.View`
    background-color: #fff;
    border-width: 1px;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
`;
export const AtrasadoList = styled.View`
    background-color: #fff;
    border-width: 1px;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
`;


  export const RoutesTitle = styled.Text`
        font-size: 16px;
        font-family: 'RobotoSlab-Medium';
        color: #333;
   `;

 export const RoutesDescription= styled.Text`
        font-size: 16px;
        color: #999;
        margin-top: 5px;
        line-height: 24px;
    `;
 export const RoutesButton = styled(RectButton)`
        height: 42px;
        border-radius: 5px;
        border-width: 2px;
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
