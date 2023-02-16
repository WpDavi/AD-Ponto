import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BancodeDados({ data }) {
  var dia = 'Segunda';
  if (data.dia == 'Tuesday') {
    dia = 'Terça';
  } else if (data.dia == 'Wednesday') {
    dia = 'Quarta';
  } else if (data.dia == 'Thursday') {
    dia = 'Quinta';
  } else if (data.dia == 'Friday') {
    dia = 'sexta';
  } else if (data.dia == 'Saturday') {
    dia = 'Sábado';
  } else if (data.dia == 'Sunday') {
    dia = 'Domingo';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.containertxt}>
          <Text style={styles.data}>
            {data.data.substr(8, 9)}/{data.data.substr(5, 2)}/{' '}
            {data.data.substr(0, 4)}
          </Text>
        </View>

        <View style={styles.containertxt}>
          <Text style={styles.data}>{data.dia}</Text>
        </View>

        <View style={styles.containertxt}>
          <Text style={styles.data}>{data.carga}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  data: {
    fontSize: 12,
  },
  containertxt: {
    borderWidth: 1,
    height: 30,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
