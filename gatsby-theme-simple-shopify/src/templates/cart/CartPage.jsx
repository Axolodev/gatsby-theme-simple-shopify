import React from 'react';
import { Flex, Box, Button } from 'rebass';
import styled from 'styled-components';
import strings from './strings.json';

import ThemedText from '../../components/ThemedText';
import formatPrice from '../../utils/formatPrice';
import useShopifyFunctions from '../../hooks/useShopifyFunctions';
import LineItem from './LineItem';

const { cartSubtotalLabel, cartCheckoutButton, cartHeader } = strings;

const CheckoutButton = styled(Button)(({ theme }) => ({
  fontFamily: theme.fonts.sans,
}));

function CartPage() {
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

  const buttonEnabled = checkout.loaded && checkout.lineItems.length > 0;

  return (
    <Box px={[3, 4]} py={3} mx="auto" style={{ maxWidth: 1300 }}>
      <ThemedText as="h1" fontSize={[3, 4, 5]}>
        {cartHeader}
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
            {cartSubtotalLabel}
          </ThemedText>
          <ThemedText>{displaySubtotalPrice}</ThemedText>
        </Flex>
        <Box style={{ height: 1, opacity: 0.5 }} bg="black" my={2} />
      </Box>
      <Flex width={1} justifyContent="flex-end">
        <CheckoutButton
          as={'a'}
          href={buttonEnabled && webUrl}
          mt={3}
          variant="highlight"
          px={4}
          py={3}
          style={{
            opacity: buttonEnabled ? 1 : 0.7,
          }}
        >
          {cartCheckoutButton}
        </CheckoutButton>
      </Flex>
    </Box>
  );
}

export default CartPage;
