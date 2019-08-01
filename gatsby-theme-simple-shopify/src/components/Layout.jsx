import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import './reset.css';
import { ShopifyClientProvider } from './context/ShopifyContext';

function Layout({ children }) {
  return (
    <ShopifyClientProvider>
      <ThemeProvider theme={theme}>
        <React.Fragment>{children}</React.Fragment>
      </ThemeProvider>
    </ShopifyClientProvider>
  );
}

export default Layout;
