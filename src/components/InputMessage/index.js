import { cleanText } from '~/utils/text';

import { Container } from './styles';

export const InputMessage = ({ text, setText }) => {
  return (
    <Container
      multiline
      outlineColor="#00658a"
      activeOutlineColor="#00bbff"
      selectionColor="#00bbff"
      mode="outlined"
      label="Mensagem"
      numberOfLines={3}
      theme={{ colors: { background: '#ffffff' } }}
      value={text}
      onChangeText={setText}
      onBlur={() => cleanText(text, setText)}
    />
  );
};
