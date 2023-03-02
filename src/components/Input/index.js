import { useState } from 'react';

import { cleanText } from '~/utils/text';

import { Container } from './styles';

export const Input = ({ text, setText, label }) => {
  const [color, setColor] = useState('#1cade2');
  return (
    <Container
      cursorColor="#1cade2"
      placeholderTextColor="#0076a1"
      placeholder={label}
      value={text}
      onChangeText={setText}
      color={color}
      onFocus={() => {
        setColor('#0076a1');
      }}
      onBlur={() => {
        setColor('#1cade2');
        cleanText(text, setText);
      }}
    />
  );
};
