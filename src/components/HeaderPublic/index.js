import { Container, Logo, Triangle } from './styles';

export const HeaderPublic = () => {
  return (
    <Container>
      <Logo source={require('~/assets/logo.png')} />
      <Triangle />
    </Container>
  );
};
