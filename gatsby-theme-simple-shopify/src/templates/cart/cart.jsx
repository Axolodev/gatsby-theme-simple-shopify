import React from 'react';
import { Flex, Box, Button, Image } from 'rebass';
import VisuallyHidden from '@reach/visually-hidden';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import ThemedText from '../../components/ThemedText';
import formatPrice from '../../utils/formatPrice';
import ProductCounter from '../../components/ProductCounter';
import { useShopifyFunctions } from '../../components/context/ShopifyContext';

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
            style={{ opacity: 0.6 }}
          >
            Precio: {displayPrice}
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

const CheckoutButton = styled(Button)(({ theme }) => ({
  fontFamily: theme.fonts.sans,
}));

function CartPageContent() {
  const { checkout, updateItem, removeItem } = useShopifyFunctions();
  const { subtotalPrice, webUrl } = checkout;

  const displaySubtotalPrice = formatPrice(Number(subtotalPrice));

  async function decreaseProductAmount({ id, quantity }) {
    if (quantity === 1) return;
    try {
      await updateItem({ id, quantity: quantity - 1 });
    } catch (error) {
      console.error(error);
    }
  }

  async function increaseProductAmount({ id, quantity }) {
    try {
      await updateItem({ id, quantity: quantity + 1 });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box px={[3, 4]} py={3} mx="auto" style={{ maxWidth: 1300 }}>
      <ThemedText as="h1" fontSize={[3, 4, 5]}>
        Carrito
      </ThemedText>
      <Box mt={2}>
        {checkout.loaded &&
          checkout.lineItems.map(lineItem => (
            <LineItem
              key={lineItem.id}
              lineItem={lineItem}
              decreaseProductAmount={decreaseProductAmount}
              increaseProductAmount={increaseProductAmount}
              removeItem={removeItem}
            />
          ))}
      </Box>
      <Box mt={3}>
        <Box style={{ height: 1, opacity: 0.5 }} bg="black" my={2} />
        <Flex width={1}>
          <ThemedText fontSize={3} flex={1}>
            Subtotal:
          </ThemedText>
          <ThemedText>{displaySubtotalPrice}</ThemedText>
        </Flex>
        <Box style={{ height: 1, opacity: 0.5 }} bg="black" my={2} />
      </Box>
      <Flex width={1} justifyContent="flex-end">
        <CheckoutButton
          as={'a'}
          href={webUrl}
          mt={3}
          variant="highlight"
          px={4}
          py={3}
        >
          Checkout
        </CheckoutButton>
      </Flex>
    </Box>
  );
}

function CartPage(props) {
  return (
    <Layout>
      <CartPageContent {...props} />
    </Layout>
  );
}

export default CartPage;
