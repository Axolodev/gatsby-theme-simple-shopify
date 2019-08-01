import React, { useState } from 'react';
import { Flex, Box, Button } from 'rebass';
import { navigate } from 'gatsby';

import strings from './strings.json';
import formatPrice from '../../utils/formatPrice';
import ThemedText from '../../components/ThemedText';
import ProductCounter from '../../components/ProductCounter';
import useShopifyFunctions from '../../hooks/useShopifyFunctions';
import ProductGalleryCurrentImage from './ProductGalleryCurrentImage';
import ProductGalleryThumbnails from './ProductGalleryThumbnails';
import { CurrentImageContextProvider } from './CurrentImageContext';
import DescriptionBox from './DescriptionBox';

const { productAddToCartButton, productPriceLabel } = strings;

function ProductPage({ data, pageContext }) {
  const [currentAmount, setCurrentAmount] = useState(1);
  const { addItem } = useShopifyFunctions();
  const {
    product: { title, descriptionHtml, images, variants },
  } = data;
  const { cartUrl } = pageContext;

  // Todo: Allow selection of variants
  const { shopifyId } = variants[0];

  async function addToCartHandler() {
    await addItem({ variantId: shopifyId, quantity: currentAmount });
    navigate(cartUrl);
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
          <ProductGalleryCurrentImage images={images} />
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
            {productPriceLabel}{' '}
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
              {productAddToCartButton}
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

export default ProductPage;
