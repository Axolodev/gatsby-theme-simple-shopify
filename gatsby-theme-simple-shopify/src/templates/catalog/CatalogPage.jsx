import React from 'react';
import { Flex } from 'rebass';
import IndividualProduct from './IndividualProduct';

function CatalogPage(props) {
  const products = props.data.allShopifyProduct.nodes;

  return (
    <Flex flexWrap="wrap" px={2} pt={3} mx="auto" style={{ maxWidth: 1300 }}>
      {products.map(product => (
        <IndividualProduct key={product.id} product={product} />
      ))}
    </Flex>
  );
}

export default CatalogPage;
