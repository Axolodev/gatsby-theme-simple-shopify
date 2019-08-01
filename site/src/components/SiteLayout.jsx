import React from 'react';
import Helmet from 'react-helmet';
import { Flex, Box } from 'rebass';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import './reset.css';

function SiteLayout(props) {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Helmet>
          <html lang="en" />
        </Helmet>

        <Flex flexDirection="column" style={{ minHeight: '100vh' }}>
          <Navbar />
          <Box
            as="main"
            flex="1"
            width={1}
            style={{ maxWidth: 1300, height: '100%' }}
            mx="auto"
          >
            {props.children}
          </Box>
          <Footer />
        </Flex>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default SiteLayout;
