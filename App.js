import { StatusBar } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import { ThemeProvider } from '~/context/ThemeContext';
import { Routes } from '~/routes';

const App = () => {
  return (
    <ThemeProvider>
      <AlertNotificationRoot>
        <StatusBar
          backgroundColor="#1cade2"
          barStyle="light-content"
        />
        <Routes />
      </AlertNotificationRoot>
    </ThemeProvider>
  );
};

export default App;
