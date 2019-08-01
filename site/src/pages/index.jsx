import React from 'react';
import Helmet from 'react-helmet';
import { Text, Box } from 'rebass';
import GatsbyLink from 'gatsby-link';
import SiteLayout from '../components/SiteLayout';

function Home() {
  return (
    <SiteLayout>
      <Helmet title="Home" />
      <Box py={3}>
        <Text
          as="h1"
          fontSize={4}
          fontFamily="sans"
          color="black"
          lineHeight={1}
        >
          Hey, there's nothing here!
        </Text>
        <Text as="p" fontFamily="sans" py={3} color="black" lineHeight={1}>
          This is just a demo page for the gatsby-theme-simple-shopify.
        </Text>
        <Text
          as="p"
          fontFamily="sans"
          py={3}
          color="black"
          lineHeight={1}
          fontSize={1}
        >
          Psst, how about checking out the{' '}
          <Text
            as={GatsbyLink}
            lineHeight="inherit"
            color="darkHighlight"
            fontFamily="inherit"
            to={'/store/catalog'}
          >
            catalog
          </Text>
          ?
        </Text>
      </Box>
    </SiteLayout>
  );
}

export default Home;
