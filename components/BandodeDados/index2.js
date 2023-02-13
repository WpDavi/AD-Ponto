import React, { useEffect, useState } from "react";
import Api from "../../src/services/Api";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BancodeDados2({ data }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent:'center'}}>

        <View style={styles.containertxt}>  
          <Text style={styles.data}>{data.total_noturno_trabalhado}</Text>                          
        </View>  

        <View style={styles.containertxt}> 
          <Text style={styles.data}>{data.extra_noturno}</Text>                           
        </View>   

        <View style={styles.containertxt}>    
          <Text style={styles.data}>{data.extra}</Text>                        
        </View>   

        <View style={styles.containertxt}>   
          <Text style={styles.data}>{data.workedHours}</Text>                         
        </View>   

        <View style={styles.containertxt}>   
          <Text style={styles.data}>{data.banco_horas_saldo}</Text>                          
        </View>                
      </View>     
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  data:{
    fontSize:12

  },
  containertxt:{
    borderWidth:1,
    height:30,
    width: '18%',          
    alignItems:'center',
    justifyContent:'center'
}

  
});
