import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function BotaoPonto({ focused, color }) {
  const navigation = useNavigation();

  const novoPonto = async () => {
    navigation.navigate('Ponto');
  };

  return (
    <TouchableOpacity
      onPress={novoPonto}
      style={[
        styles.container,
        { backgroundColor: focused ? '#0ea7df' : '#00bbff' },
      ]}
    >
      <Image
        style={{ width: 25, height: 43 }}
        source={require('~/assets/bater-ponto2.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
