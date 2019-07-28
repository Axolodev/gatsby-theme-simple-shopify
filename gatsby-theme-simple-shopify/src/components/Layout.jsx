import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../utils/theme';
import './reset.css';

function Layout({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Layout;
