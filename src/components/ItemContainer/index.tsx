import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useNavigation, useRoute } from "@react-navigation/native";
import {ScrollView , StyleSheet, View, Text,Linking,Keyboard } from "react-native";
import {  RectButton } from "react-native-gesture-handler";
import api from '../../services'

interface clientDetailRouteParams {
  id: number;
  phone: string;
  full_name: string;
}

export default function ItemContainer() {

  const [isKeyBoardVisible, setBoardVisible] =useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as clientDetailRouteParams;
  const message = `olá ${params.full_name}, estou estrando em contato pois gostaria de saber mais informações sobre seu pedido`;

  function NavigationToClientDetail(id: number, phone: string, full_name:string) {
    navigation.navigate('ClientStackRoutes',{
      screen :'ClientDetail',
          params: {id: id, phone: phone,full_name:full_name}

  })
  }
  function NavigationToPurchaseDetail(id: number, phone: string, full_name:string ) {
    navigation.navigate('PurchaseStackRoutes',{
      screen :'PurchaseDetail',
        params: {id: id, phone: phone,full_name:full_name}

  })
  }
  function NavigationToSaleDetail(id: number, phone: string, full_name:string) {
    navigation.navigate('SaleStackRoutes',{
      screen :'SaleDetail',
              params: {id: id, phone: phone,full_name:full_name}


  })
  }
  function NavigationToCarboyLoanDetail(id: number, phone: string, full_name:string) {
    navigation.navigate('CarboyLoanStackRoutes',{
      screen :'CarboyLoanDetail',
              params: {id: id, phone: phone,full_name:full_name}


  })
  }
  function NavigationToRepots(id: number, phone: string, full_name:string) {
    navigation.navigate('ReportStackRoutes',{
      screen :'HomeReports',//definir Rota a ser Detalhada
              params: {id: id, phone: phone,full_name:full_name}


  })
  }//definir Rota a ser Detalhada
  function NavigationToMoveDetail(id: number, phone: string, full_name:string) {
    navigation.navigate('MoveStackRoutes',{
      screen :'MoveDetail',
              params: {id: id, phone: phone,full_name:full_name}


  })
  }//trazer ID
  function NavigationToClientRouteDetail(id: number, phone: string, full_name:string) {
    navigation.navigate('ClientRouteStackRoutes',{
      screen :'ClientRouteDetail',
        params: {id: id, phone: phone,full_name:full_name}

  })
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+5585991286247&text=${message}`)
      }
useEffect (()=> {
  const KeyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
     () => {
      setBoardVisible(true);
    }
  );
  const KeyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
     () => {
      setBoardVisible(false);
      }
    );
return () => {
  KeyboardDidShowListener.remove();
  KeyboardDidHideListener.remove();
};
},[]);

  return (
    <>
{isKeyBoardVisible ? (
<>
</>

): (

  <View style={styles.itemsContainer}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>

  <RectButton style={styles.item} onPress={() =>NavigationToClientDetail(params.id,params.phone,params.full_name)}>
      <Feather color="#000" name="user" size={42} />
      <Text style={styles.itemTitle}>Ir para Clientes</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={() => NavigationToPurchaseDetail(params.id,params.phone,params.full_name)}>
      <Feather color="#e82041" name="shopping-cart" size={42} />
      <Text style={styles.itemTitle}>Ir para Compras</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={() => NavigationToSaleDetail(params.id,params.phone,params.full_name)}>
      <Feather color="orange" name="shopping-bag" size={42} />
      <Text style={styles.itemTitle}>Ir para vendas</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={() => NavigationToCarboyLoanDetail(params.id,params.phone,params.full_name)}>
      <FontAwesome color="#000" name="handshake-o" size={42} />
      <Text style={styles.itemTitle}>Ir para Empréstimos</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={() =>NavigationToRepots(params.id,params.phone,params.full_name)}>
      <FontAwesome color="brown" name="folder" size={42} />
      <Text style={styles.itemTitle}>Ir para Relatórios</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={() => NavigationToMoveDetail(params.id,params.phone,params.full_name)}>
      <Feather color="#333666" name="repeat" size={42} />
      <Text style={styles.itemTitle}>Ir para Movimentos</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={() => NavigationToClientRouteDetail(params.id,params.phone,params.full_name)}>
      <Feather color="black" name="truck" size={42} />
      <Text style={styles.itemTitle}>Ir para Rotas</Text>
    </RectButton>

    <RectButton style={styles.item} onPress={sendWhatsapp}>
      <FontAwesome color="#34CB79" name="whatsapp" size={42} />
      <Text style={styles.itemTitle}>Ir para whatsapp</Text>
    </RectButton>
  </ScrollView>
 </View>
)}

    </>
  )
};


const styles = StyleSheet.create({

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 32,  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,

    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },

  itemTitle: {
    fontFamily: 'RobotoSlab-Medium',

    textAlign: 'center',
    fontSize: 13,
  },
});
