import React from 'react';
import Helmet from 'react-helmet';
import { Text, Flex } from 'rebass';
import GatsbyLink from 'gatsby-link';
import SiteLayout from '../components/SiteLayout';

function Home() {
  return (
    <SiteLayout>
      <Helmet title="Not found" />
      <Flex py={3} flexDirection="column" px={[3, null, 4]}>
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
          Try using the navbar to navigate betweeen pages!
        </Text>
        <Text
          as="p"
          fontFamily="sans"
          py={3}
          color="black"
          lineHeight={1}
          fontSize={1}
          flex={1}
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
      </Flex>
    </SiteLayout>
  );
}

export default Home;
