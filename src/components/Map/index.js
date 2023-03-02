import { PermissionsAndroid, Platform } from 'react-native';

import { MapButton } from '../MapButton/index';
import { Container, MapLocation } from './styles';

export const Map = ({ lat, lon, loading, onPress }) => {
  return (
    <Container>
      <MapLocation
        onMapReady={() => {
          Platform.OS === 'android' &&
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(() => console.log('usuario aceitou'));
        }}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.022,
          longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        minZoomLevel={20}
        showsUserLocation={true}
        loadingEnabled={true}
      />
      <MapButton
        onPress={onPress}
        text={'BATER PONTO'}
        loading={loading}
        icon={'hand-point-up'}
      />
    </Container>
  );
};
