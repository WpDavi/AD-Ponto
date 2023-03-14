import { cleanText } from '~/utils/text';

import { Container } from './styles';

export const InputLabelSenha = ({ text, setText, label }) => {
  return (
    <Container
      outlineColor="#0076a1"
      activeOutlineColor="#00bbff"
      selectionColor="#00bbff"
      mode="outlined"
      label={label}
      secureTextEntry={true}
      theme={{ colors: { background: '#ffffff' } }}
      value={text}
      onChangeText={setText}
      onBlur={() => cleanText(text, setText)}
    />
  );
};
