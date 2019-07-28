import React, { useState } from 'react';
import { Flex, Box, Text } from 'rebass';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import formatPrice from '../utils/formatPrice';
import ThemedButton from '../components/ThemedButton';
import ThemedText from '../components/ThemedText';

const DescriptionBox = styled(ThemedText)(({ theme }) => ({
  lineHeight: theme.lineHeights[1],
  color: theme.colors.black,
  strong: {
    fontWeight: 'bold',
  },
  '& p, & ul': {
    paddingBottom: theme.space[2],
  },
  '& li': {
    paddingBottom: theme.space[3],
    marginLeft: theme.space[4],
    position: 'relative',
    '&::before': {
      content: "'-'",
      position: 'absolute',
      left: -12,
      color: theme.colors.darkPrimary,
    },
  },
}));

DescriptionBox.defaultProps = {
  as: ReactMarkdown,
};

function ProductCounter({ currentAmount, increaseAmount, decreaseAmount }) {
  return (
    <Flex bg="lightPrimary">
      <ThemedButton onClick={decreaseAmount} bg="primary" width={1 / 3} px={1}>
        -
      </ThemedButton>
      <ThemedText textAlign="center" width={1 / 3} p={1} color="white">
        {currentAmount}
      </ThemedText>
      <ThemedButton onClick={increaseAmount} bg="primary" width={1 / 3} px={1}>
        +
      </ThemedButton>
    </Flex>
  );
}

function ProductPage({ data }) {
  const [currentAmount, setCurrentAmount] = useState(1);

  function increaseAmount() {
    setCurrentAmount(a => a + 1);
  }

  function decreaseAmount() {
    setCurrentAmount(a => (a <= 1 ? 1 : a - 1));
  }

  const {
    product: { title, descriptionHtml, images, variants },
  } = data;

  const displayPrice = formatPrice(variants[0].price);

  return (
    <Layout>
      <Flex px={2} mx="auto" style={{ maxWidth: 1300 }}>
        <Box width={1 / 5}>
          <Flex flexDirection="column" p={2}>
            {images.map(image => (
              <Box
                key={image.id}
                style={{ maxWidth: 200, maxHeight: 200 }}
                p={2}
              >
                <GatsbyImage
                  fluid={image.localFile.childImageSharp.thumbnail}
                />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width={2 / 5} ml="auto" py={2} px={3} data-product-image-container>
          <GatsbyImage
            fluid={images[0].localFile.childImageSharp.fluid}
            style={{ maxWidth: 800 }}
            data-product-image
          />
        </Box>
        <Flex flexDirection="column" width={2 / 5} px={2} data-product-info>
          <ThemedText fontWeight="bold" fontSize={4} as="h1" data-title-box>
            {title}
          </ThemedText>
          <ThemedText pt={2}>
            Precio:{' '}
            <ThemedText as="span" color="primary" fontSize={3} pt={2}>
              {displayPrice}
            </ThemedText>
          </ThemedText>

          <Flex py={3}>
            <Box width={0.3} mr="auto">
              <ProductCounter
                decreaseAmount={decreaseAmount}
                increaseAmount={increaseAmount}
                currentAmount={currentAmount}
              />
            </Box>
            <ThemedButton
              width={0.4}
              fontWeight="bold"
              ml="auto"
              bg="highlight"
            >
              Agregar a carrito
            </ThemedButton>
          </Flex>
          <DescriptionBox
            pt={3}
            source={descriptionHtml}
            escapeHtml={false}
            data-description-box
          />
        </Flex>
      </Flex>
    </Layout>
  );
}

export default ProductPage;

export const productQuery = graphql`
  query SingleProductQuery {
    product: shopifyProduct {
      title
      descriptionHtml
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
            thumbnail: fluid(maxWidth: 200, maxHeight: 200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      variants {
        price
      }
    }
  }
`;
