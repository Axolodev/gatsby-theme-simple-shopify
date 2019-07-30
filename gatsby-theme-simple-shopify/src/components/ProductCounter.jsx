import React from 'react';
import { Flex, Button } from 'rebass';
import styled from 'styled-components';
import ThemedText from './ThemedText';

const FlexBg = styled(Flex)(({ theme }) => ({
  ...theme.buttons.default,
  backgroundColor: theme.colors.lightPrimary,
}));

function ProductCounter({ currentAmount, increaseAmount, decreaseAmount }) {
  return (
    <FlexBg bg="lightPrimary">
      <Button
        onClick={decreaseAmount}
        aria-label={`Disminuir cantidad a ${currentAmount - 1}`}
        variant="default"
        width={1 / 3}
        px={1}
      >
        -
      </Button>
      <ThemedText textAlign="center" width={1 / 3} p={1} color="white">
        {currentAmount}
      </ThemedText>
      <Button
        onClick={increaseAmount}
        aria-label={`Aumentar cantidad a ${currentAmount + 1}`}
        variant="default"
        width={1 / 3}
        px={1}
      >
        +
      </Button>
    </FlexBg>
  );
}

export default ProductCounter;
