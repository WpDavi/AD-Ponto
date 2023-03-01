import { ThemeProvider } from '~/context/ThemeContext';
import { Routes } from '~/routes';

const App = () => {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
