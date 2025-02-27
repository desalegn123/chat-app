import React from 'react';
import Layout from './Layout/Layout';
import { useThemeStore } from './store/useThemesStore';


const App = () => {
  const { theme } = useThemeStore();
  return (
   <div data-theme={theme}>
   <Layout/>
   </div>
  );
};

export default App;
