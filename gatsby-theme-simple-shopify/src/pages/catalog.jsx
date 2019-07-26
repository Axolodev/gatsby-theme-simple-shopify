import React from 'react';
import { Flex, Box, Text } from 'rebass';
import Image from 'gatsby-image';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const IndividualProduct = ({ product }) => {
  return (
    <Box px={2} py={2} width={[1, 1 / 2, 1 / 3, 1 / 4]}>
      <Image fluid={product.images['0'].localFile.childImageSharp.fluid} />
      <Text fontFamily="sans" fontSize={3} py={2} color="black">
        {product.title}
      </Text>
    </Box>
  );
};

function catalog(props) {
  const products = props.data.allShopifyProduct.nodes;

  return (
    <Layout>
      <Flex flexWrap="wrap" px={2} mx="auto" style={{ maxWidth: 1300 }}>
        {products.map(product => (
          <IndividualProduct key={product.id} product={product} />
        ))}
      </Flex>
    </Layout>
  );
}

export default catalog;

export const catalogQuery = graphql`
  query CatalogQuery {
    allShopifyProduct {
      nodes {
        id
        title
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 320) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
