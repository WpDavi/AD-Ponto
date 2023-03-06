import Icon from '@expo/vector-icons/FontAwesome5';

export const GoBack = ({ color, size }) => {
  return (
    <Icon
      color={color || '#ffffff'}
      size={size || 16}
      name="arrow-left"
    />
  );
};
