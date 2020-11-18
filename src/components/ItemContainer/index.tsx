import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { useNavigation, useRoute } from "@react-navigation/native";

import { KeyboardAvoidingView,Platform,Linking, ScrollView, Alert, StyleSheet,Button, View, Text } from "react-native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";

export default function ItemContainer() {
return(
<>

<View style={styles.itemsContainer}>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
<TouchableOpacity style={styles.item} onPress={()=> {}}>
<Feather color="brown" name="folder" size={42} />
<Text style={styles.itemTitle}>Ir para Relatórios</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.item} onPress={()=> {}}>
<Feather color="#333666" name="repeat" size={42} />
<Text style={styles.itemTitle}>Ir para Movimentos</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.item} onPress={()=> {}}>
<Feather color="black" name="truck" size={42} />
<Text style={styles.itemTitle}>Ir para Rotas</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.item} onPress={()=> {}}>
<FontAwesome color="#34CB79" name="whatsapp" size={42} />
<Text style={styles.itemTitle}>Ir para whatsapp</Text>
</TouchableOpacity>

</ScrollView>
</View>

<View style={styles.itemsContainer}>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>

<TouchableOpacity style={styles.item} onPress={()=> {}}>
<Feather color="#e82041" name="shopping-cart" size={42} />
<Text style={styles.itemTitle}>Ir para Compras</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.item} onPress={()=> {}}>
<Feather color="orange" name="shopping-bag" size={42} />
<Text style={styles.itemTitle}>Ir para vendas</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.item} onPress={()=> {}}>
<Feather color="blue" name="share-2" size={42} />
<Text style={styles.itemTitle}>Ir para Empréstimos</Text>
</TouchableOpacity>

</ScrollView>
</View>

</>
)
};


const styles = StyleSheet.create({

itemsContainer: {
flexDirection: 'row',
},

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

selectedItem: {
borderColor: '#34CB79',
borderWidth: 2,
},

itemTitle: {
  fontFamily: 'RobotoSlab-Medium',

textAlign: 'center',
fontSize: 13,
},
});
