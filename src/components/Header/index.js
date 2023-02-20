import React, { useEffect, useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

export default function Header() {
  const navigation = useNavigation();

  const [name1, setName1] = useState('');
  useEffect(() => {
    async function loadEmail() {
      const name = await AsyncStorage.getItem('name');
      setName1(name);
    }
    loadEmail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.nomeuser}> {`Bem vindo ${name1}`} </Text>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.btnNotificacoes}
          activeOpacity={0.9}
        >
          <Feather
            name="menu"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1CADE2',
    flexDirection: 'row',
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 50,
    height: 100,
  },
  content: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nomeuser: {
    fontSize: 18,
    padding: 10,
    color: '#FFF',
    fontWeight: 'bold',
    maxWidth: '85%',
  },
  btnNotificacoes: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
    color: '#FFF',
  },
});
