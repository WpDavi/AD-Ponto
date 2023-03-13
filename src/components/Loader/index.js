import { ActivityIndicator } from 'react-native';

export const Loader = ({ size, color }) => {
  return (
    <ActivityIndicator
      size={size || 'small'}
      color={color || '#ffffff'}
    />
  );
};
