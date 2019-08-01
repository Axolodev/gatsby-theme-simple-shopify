import React from 'react';
import { Flex, Text, Box } from 'rebass';
import GatsbyLink from 'gatsby-link';

function Navbar() {
  return (
    <Box py={3} width={1} bg="primary" as="nav">
      <Flex
        style={{ maxWidth: 1300 }}
        justifyContent="flex-end"
        mx="auto"
        px={[3, null, 4]}
      >
        <Text
          as={GatsbyLink}
          to="/"
          fontFamily="sans"
          color="white"
          fontSize={3}
          style={{ textDecoration: 'none' }}
        >
          Home
        </Text>
        <Text
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/RobRuizR/gatsby-theme-simple-shopify"
          fontFamily="sans"
          color="white"
          fontSize={3}
          style={{ textDecoration: 'none' }}
          ml="auto"
        >
          Docs
        </Text>
        <Text
          as={GatsbyLink}
          to="/store/catalog"
          fontFamily="sans"
          color="white"
          fontSize={3}
          style={{ textDecoration: 'none' }}
          ml={3}
        >
          Catalog
        </Text>
        <Text
          as={GatsbyLink}
          to="/store/cart"
          fontFamily="sans"
          color="white"
          fontSize={3}
          style={{ textDecoration: 'none' }}
          ml={3}
        >
          Cart
        </Text>
      </Flex>
    </Box>
  );
}

export default Navbar;
