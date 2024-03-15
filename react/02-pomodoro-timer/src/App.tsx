import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { CyclesContextProvider } from './contexts/CyclesContext';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>

        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
