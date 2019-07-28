import React from 'react';
import { Flex, Button } from 'rebass';
import ThemedText from './ThemedText';

function ProductCounter({ currentAmount, increaseAmount, decreaseAmount }) {
  return (
    <Flex bg="lightPrimary">
      <Button onClick={decreaseAmount} variant="default" width={1 / 3} px={1}>
        -
      </Button>
      <ThemedText textAlign="center" width={1 / 3} p={1} color="white">
        {currentAmount}
      </ThemedText>
      <Button onClick={increaseAmount} variant="default" width={1 / 3} px={1}>
        +
      </Button>
    </Flex>
  );
}

export default ProductCounter;
