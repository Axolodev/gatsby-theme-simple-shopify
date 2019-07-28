import React from 'react';
import { Flex, Box } from 'rebass';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import ThemedText from '../components/ThemedText';
import formatPrice from '../utils/formatPrice';
import GatsbyImage from 'gatsby-image';
import ProductCounter from '../components/ProductCounter';

const IndividualCartProduct = ({ product }) => {
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
    <Flex width={1} py={2}>
      <Box width={1 / 10}>
        <GatsbyImage
          fluid={images['0'].localFile.childImageSharp.fluid}
          style={{ maxWidth: 150 }}
        />
      </Box>
      <Box pl={3} width={9 / 10}>
        <ThemedText fontFamily="sans" lineHeight={1} fontSize={3} color="black">
          {title}
        </ThemedText>
        <ThemedText fontFamily="sans" pt={2} lineHeight={1} color="black">
          Precio: {minDisplayPrice} {hasPriceRange && `- ${maxDisplayPrice}`}
        </ThemedText>
        <Box pt={4} width={1 / 8}>
          <ProductCounter
            currentAmount={0}
            increaseAmount={() => {}}
            decreaseAmount={() => {}}
          />
        </Box>
      </Box>
    </Flex>
  );
};

function CartPage({ data }) {
  const products = data.allShopifyProduct.nodes;

  return (
    <Layout>
      <Box px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
        <ThemedText as="h1" fontSize={[3, 4, 5]}>
          Carrito
        </ThemedText>
        {products.map(product => (
          <IndividualCartProduct key={product.id} product={product} />
        ))}
      </Box>
    </Layout>
  );
}

export default CartPage;

export const pageQuery = graphql`
  query DummyQuery {
    allShopifyProduct {
      nodes {
        id
        title
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
          localFile {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
