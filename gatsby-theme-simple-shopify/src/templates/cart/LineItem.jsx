import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import ProductCounter from '../../components/ProductCounter';
import { Flex, Box, Button, Image } from 'rebass';
import ThemedText from '../../components/ThemedText';
import formatPrice from '../../utils/formatPrice';
import strings from './strings.json';

const { cartItemPriceLabel, cartItemAriaRemoveFromCart } = strings;

const LineItem = ({
  lineItem,
  decreaseProductAmount,
  increaseProductAmount,
  removeItem,
}) => {
  const { quantity, title, variant, id } = lineItem;
  const { src: imageSrc, altText } = variant.image;

  const displayPrice = formatPrice(Number(variant.price));

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
        onClick={() => removeItem(id)}
      >
        <VisuallyHidden>{cartItemAriaRemoveFromCart}</VisuallyHidden>
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
        <Image src={imageSrc} alt={altText} style={{ maxWidth: 120 }} />
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
            style={{ opacity: 0.7 }}
          >
            {cartItemPriceLabel} {displayPrice}
          </ThemedText>
          <Box width={[1 / 3, 1 / 4, 1 / 6]}>
            <ProductCounter
              currentAmount={quantity}
              decreaseAmount={() => decreaseProductAmount({ id, quantity })}
              increaseAmount={() => increaseProductAmount({ id, quantity })}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LineItem;
