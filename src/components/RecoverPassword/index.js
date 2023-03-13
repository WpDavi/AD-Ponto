import { Container, Text } from './styles';

export const RecoverPassword = ({ onPress, text }) => {
  return (
    <Container
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </Container>
  );
};
