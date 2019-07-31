import React, { useState, useContext } from 'react';
import { Flex, Box, Button } from 'rebass';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';
import { graphql, navigate } from 'gatsby';

import Layout from '../components/Layout';
import formatPrice from '../utils/formatPrice';
import ThemedText from '../components/ThemedText';
import { mediaQueries } from '../utils/theme';
import ProductCounter from '../components/ProductCounter';
import { useShopifyFunctions } from '../components/context/ShopifyContext';

const DescriptionBox = styled(ThemedText)(({ theme }) => ({
  lineHeight: theme.lineHeights[1],
  color: theme.colors.black,
  strong: {
    fontWeight: 'bold',
  },
  '& p, & ul': {
    paddingBottom: theme.space[1],
  },
  '& li': {
    paddingBottom: theme.space[3],
    marginLeft: theme.space[3],
    position: 'relative',
    '&::before': {
      content: "'-'",
      position: 'absolute',
      left: -12,
      color: theme.colors.darkPrimary,
    },
    [mediaQueries[1]]: {
      marginLeft: theme.space[4],
    },
  },
}));

DescriptionBox.defaultProps = {
  as: ReactMarkdown,
};

const ThumbnailBox = styled(Box)(
  ({ theme, maxImageHeight, maxImageWidth, currentImageIndex, index }) => ({
    maxWidth: maxImageWidth,
    maxHeight: maxImageHeight,
    transition: '0.5s ease all',
    cursor: 'pointer',
    border: `4px solid ${
      currentImageIndex !== index ? 'transparent' : theme.colors.primary
    }`,
  })
);

const ThumbnailFlex = styled(Flex)(({ transformPx }) => ({
  transition: '0.5s ease all',
  transform: `translateX(${transformPx}px)`,
  [mediaQueries[1]]: {
    transform: `translateY(${transformPx}px)`,
  },
}));

function ProductGalleryThumbnails({
  images,
  maxImageHeight = 150,
  maxImageWidth = 150,
  maxContainerHeight = 500,
}) {
  const { currentImageIndex, setCurrentImageIndex } = useCurrentImageContext();

  function calculateTransform() {
    if (currentImageIndex < 1) {
      return 0;
    }

    if (currentImageIndex >= images.length - 1) {
      return (images.length - 2.5) * -(maxImageHeight + 16);
    }

    return (currentImageIndex - 1) * -(maxImageHeight + 8);
  }

  return (
    <Box
      width={1}
      aria-hidden
      style={{ maxHeight: maxContainerHeight, overflow: 'hidden' }}
    >
      <ThumbnailFlex
        flexDirection={['row', null, 'column']}
        width={[images.length * maxImageWidth, null, 1]}
        transformPx={calculateTransform()}
      >
        {images.map((image, index) => (
          <ThumbnailBox
            key={image.id}
            index={index}
            currentImageIndex={currentImageIndex}
            maxImageHeight={maxImageHeight}
            maxImageWidth={maxImageWidth}
            width={['300px', null, 'auto']}
            onClick={() => setCurrentImageIndex(index)}
            ml={[0, null, 2]}
            mr={[2, null, 0]}
            my={1}
          >
            <GatsbyImage fluid={image.localFile.childImageSharp.thumbnail} />
          </ThumbnailBox>
        ))}
      </ThumbnailFlex>
    </Box>
  );
}

function ProductGalleryMainImage({ images }) {
  const { currentImageIndex } = useCurrentImageContext();
  const currentImage = images[currentImageIndex];

  return (
    <GatsbyImage
      fluid={currentImage.localFile.childImageSharp.main}
      alt={currentImage.altText}
      style={{ maxWidth: 800 }}
      data-product-image
    />
  );
}

const CurrentImageContext = React.createContext(0);
const { Provider } = CurrentImageContext;

export function CurrentImageContextProvider({ children }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Provider value={[currentImageIndex, setCurrentImageIndex]}>
      {children}
    </Provider>
  );
}

function useCurrentImageContext() {
  const [currentImageIndex, setCurrentImageIndex] = useContext(
    CurrentImageContext
  );

  return {
    currentImageIndex,
    setCurrentImageIndex,
  };
}

function ProductPage({ data }) {
  const [currentAmount, setCurrentAmount] = useState(1);
  const { addItem } = useShopifyFunctions();
  const {
    product: { title, descriptionHtml, images, variants },
  } = data;

  // Todo: Allow selection of variant
  const { shopifyId } = variants[0];

  async function addToCartHandler() {
    await addItem({ variantId: shopifyId, quantity: currentAmount });
    navigate('/cart');
  }

  function increaseAmount() {
    setCurrentAmount(a => a + 1);
  }

  function decreaseAmount() {
    setCurrentAmount(a => (a <= 1 ? 1 : a - 1));
  }

  const displayPrice = formatPrice(variants[0].price);

  return (
    <CurrentImageContextProvider>
      <Flex
        flexDirection={['column', null, 'row']}
        pt={3}
        px={4}
        mx="auto"
        style={{ maxWidth: 1300 }}
      >
        <Box
          width={[1, null, 1 / 5]}
          py={2}
          px={[2, null, 0]}
          order={[2, null, 1]}
        >
          <ProductGalleryThumbnails images={images} />
        </Box>
        <Box
          width={[1, null, 2 / 5]}
          ml="auto"
          py={2}
          px={[2, null, 3]}
          data-product-image-container
          order={[1, null, 2]}
        >
          <ProductGalleryMainImage images={images} />
        </Box>
        <Flex
          flexDirection="column"
          width={[1, null, 2 / 5]}
          px={2}
          data-product-info
          order={3}
        >
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
            <Box width={0.4} mr="auto">
              <ProductCounter
                decreaseAmount={decreaseAmount}
                increaseAmount={increaseAmount}
                currentAmount={currentAmount}
              />
            </Box>
            <Button
              width={0.5}
              ml="auto"
              variant="highlight"
              onClick={addToCartHandler}
            >
              Agregar a carrito
            </Button>
          </Flex>
          <DescriptionBox
            pt={3}
            source={descriptionHtml}
            escapeHtml={false}
            data-description-box
          />
        </Flex>
      </Flex>
    </CurrentImageContextProvider>
  );
}

export default props => (
  <Layout>
    <ProductPage {...props} />
  </Layout>
);

export const productQuery = graphql`
  query SingleProductQuery {
    product: shopifyProduct {
      title
      descriptionHtml
      images {
        id
        altText
        localFile {
          childImageSharp {
            main: fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
            thumbnail: fluid(maxWidth: 200, maxHeight: 200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      variants {
        shopifyId
        price
      }
    }
  }
`;
