import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Linking, Platform } from 'react-native';
import Api from '../services/Api';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useNotification = () =>{
 const registerForPushNotificationsAsync = async () => {

    const infos = await Api.getInformacoesPessoais()   
    const pis = infos.pis   
    
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const tokenn = (await Notifications.getExpoPushTokenAsync()).data;      
      if(tokenn) {
        await AsyncStorage.setItem('@notificationToken', tokenn)
      } 
    } else {
      alert('Must use physical device for Push Notifications');
    }  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }    
  };
  const handleNotification = (notification) =>{
  }
  
  const handleNotificationResponse = (
    response
  ) =>{ const data = response;

    if (data.url) Linking.openURL(data.url)
  }

  return{
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse
  }
}