import React from 'react';
import Helmet from 'react-helmet';
import { Text, Box } from 'rebass';
import GatsbyLink from 'gatsby-link';
import SiteLayout from '../components/SiteLayout';

function Home() {
  return (
    <SiteLayout>
      <Helmet title="Home" />
      <Box py={3} px={[3, null, 4]}>
        <Text
          as="h1"
          fontSize={4}
          fontFamily="sans"
          color="black"
          lineHeight={1}
        >
          Gatsby Theme Simple Shopify
        </Text>
        <Text
          as="p"
          fontFamily="sans"
          pb={1}
          pt={3}
          color="black"
          lineHeight={1}
        >
          This is a demo site for the gatsby-theme-simple-shopify Gatsby Theme,
          which was created for the{' '}
          <Text
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://themejam.gatsbyjs.org/"
            color="darkHighlight"
          >
            Gatsby Theme Jam 2019
          </Text>
        </Text>
        <Text as="p" py={1} fontFamily="sans" color="black" lineHeight={1}>
          You can check the{' '}
          <Text
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/RobRuizR/gatsby-theme-simple-shopify"
            color="darkHighlight"
          >
            official docs
          </Text>{' '}
          for more information on how to use it, along with the code for this
          site.
        </Text>

        <Text as="p" py={1} fontFamily="sans" color="black" lineHeight={1}>
          Check out the{' '}
          <Text as={GatsbyLink} to="/store/catalog" color="darkHighlight">
            catalog
          </Text>{' '}
          to find out how it works!
        </Text>
      </Box>
    </SiteLayout>
  );
}

export default Home;
