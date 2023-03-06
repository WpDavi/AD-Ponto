import Icon from '@expo/vector-icons/FontAwesome5';

import { Container, Text } from './styles';

export const ShowCity = ({ city }) => {
  return (
    <Container>
      <Icon
        color="#ffffff"
        size={16}
        name="location-arrow"
      />
      <Text>{city}</Text>
    </Container>
  );
};
