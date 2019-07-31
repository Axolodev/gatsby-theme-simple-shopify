import React from 'react';
import { Flex, Box, Text } from 'rebass';
import Image from 'gatsby-image';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import formatPrice from '../../utils/formatPrice';
import GatsbyLink from 'gatsby-link';

const IndividualProduct = ({ product }) => {
  const {
    priceRange: {
      minVariantPrice: { amount: minPrice },
      maxVariantPrice: { amount: maxPrice },
    },
    title,
    images,
  } = product;

  const hasPriceRange = minPrice !== maxPrice;

  const minDisplayPrice = formatPrice(minPrice);
  const maxDisplayPrice = formatPrice(maxPrice);

  return (
    <Box
      px={4}
      py={2}
      width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}
      as={GatsbyLink}
      to={`/product/${handle}`}
      style={{ textDecoration: 'none ' }}
    >
      <Image
        alt={images['0'].altText}
        fluid={images['0'].localFile.childImageSharp.fluid}
      />
      <Text
        fontFamily="sans"
        lineHeight={1}
        fontSize={2}
        fontWeight="bold"
        as="h3"
        py={1}
        color="black"
      >
        {title}
      </Text>
      <Text fontFamily="sans" lineHeight={1} color="black" as="p">
        Precio: {minDisplayPrice} {hasPriceRange && `- ${maxDisplayPrice}`}
      </Text>
    </Box>
  );
};

function CatalogPage(props) {
  const products = props.data.allShopifyProduct.nodes;

  return (
    <Layout>
      <Flex flexWrap="wrap" px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
        {products.map(product => (
          <IndividualProduct key={product.id} product={product} />
        ))}
      </Flex>
    </Layout>
  );
}

export default CatalogPage;

export const catalogQuery = graphql`
  query CatalogQuery {
    allShopifyProduct {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          altText
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
