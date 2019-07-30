import React from 'react';
import { Flex, Box, Button } from 'rebass';
import VisuallyHidden from '@reach/visually-hidden';
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
    <Flex width={1} py={2} alignItems="center" style={{ position: 'relative' }}>
      <Button
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        px={0}
        py={0}
        bg="white"
        m={2}
      >
        <VisuallyHidden>Cerrar</VisuallyHidden>
        <div aria-hidden style={{ width: 12, height: 12 }}>
          <svg
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#333"
            fill="#333"
            style={{ width: 12, height: 12, display: 'block' }}
          >
            <path d="M0 0 L12 12" stroke-width="2" />
            <path d="M12 0 L0 12" stroke-width="2" />
          </svg>
        </div>
      </Button>

      <Box width={120}>
        <GatsbyImage
          fluid={images['0'].localFile.childImageSharp.fluid}
          alt={images['0'].altText}
          style={{ maxWidth: 120 }}
        />
      </Box>
      <Flex
        flexDirection="column"
        pl={3}
        width={8 / 10}
        style={{ height: 120 }}
      >
        <ThemedText width={0.9} as="h3" lineHeight={1} fontSize={[2, null, 3]}>
          {title}
        </ThemedText>
        <Flex
          flexDirection={['row', 'column']}
          justifyContent="space-between"
          alignItems={['flex-end', 'initial']}
          flex={1}
        >
          <ThemedText
            as="p"
            pt={2}
            fontSize={[2]}
            lineHeight={1}
            style={{ opacity: 0.6 }}
          >
            Precio: {minDisplayPrice} {hasPriceRange && `- ${maxDisplayPrice}`}
          </ThemedText>
          <Box width={[1 / 3, 1 / 4, 1 / 6]}>
            <ProductCounter
              currentAmount={0}
              increaseAmount={() => {}}
              decreaseAmount={() => {}}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

function CartPage({ data }) {
  const products = data.allShopifyProduct.nodes;

  return (
    <Layout>
      <Box px={[3, 4]} py={3} mx="auto" style={{ maxWidth: 1300 }}>
        <ThemedText as="h1" fontSize={[3, 4, 5]}>
          Carrito
        </ThemedText>
        <Box mt={2}>
          {products.map(product => (
            <IndividualCartProduct key={product.id} product={product} />
          ))}
        </Box>
        <Box mt={3}>
          <Box style={{ height: 1, opacity: 0.5 }} bg="black" my={2} />
          <Flex width={1}>
            <ThemedText fontSize={3} flex={1}>
              Subtotal:
            </ThemedText>
            <ThemedText>$0.00</ThemedText>
          </Flex>
          <Box style={{ height: 1, opacity: 0.5 }} bg="black" my={2} />
        </Box>
        <Flex width={1} justifyContent="flex-end">
          <Button mt={3} variant="highlight" px={4} py={3}>
            Checkout
          </Button>
        </Flex>
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
          altText
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
