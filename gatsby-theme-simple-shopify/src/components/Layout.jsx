import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>{children}</React.Fragment>
    </ThemeProvider>
  );
}

export default Layout;
