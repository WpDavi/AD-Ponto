import { TxtHora } from '~/pages/Inicio/Ponto/styled';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function Mapa() {
  const [hour, setHour] = useState();

  const updateClock = () => {
    const hour = new Date().toLocaleTimeString();
    setHour(hour);
  };
  setInterval(updateClock, 1000);

  return (
    <View>
      <TxtHora>{hour}</TxtHora>
    </View>
  );
}
