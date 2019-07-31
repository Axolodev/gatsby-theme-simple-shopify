import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../config/theme';
import './reset.css';
import { ShopifyClientProvider } from './context/ShopifyContext';

function Layout({ children }) {
  return (
    <ShopifyClientProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ShopifyClientProvider>
  );
}

export default Layout;
