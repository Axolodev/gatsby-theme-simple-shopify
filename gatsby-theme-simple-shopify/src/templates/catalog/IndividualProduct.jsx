import React from 'react';
import { Box, Text } from 'rebass';
import Image from 'gatsby-image';
import GatsbyLink from 'gatsby-link';
import formatPrice from '../../utils/formatPrice';
import strings from './strings.json';

const { catalogPriceLabel } = strings;

const IndividualProduct = ({ product }) => {
  const {
    priceRange: {
      minVariantPrice: { amount: minPrice },
      maxVariantPrice: { amount: maxPrice },
    },
    title,
    images,
    fields: { shopifyThemePath },
  } = product;

  const hasPriceRange = minPrice !== maxPrice;

  const minDisplayPrice = formatPrice(minPrice);
  const maxDisplayPrice = formatPrice(maxPrice);

  return (
    <Box
      px={4}
      py={2}
      width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]}
      as={GatsbyLink}
      to={shopifyThemePath}
      style={{ textDecoration: 'none ' }}
    >
      <Image
        alt={images['0'].altText}
        fluid={images['0'].localFile.childImageSharp.fluid}
      />
      <Text
        fontFamily="sans"
        lineHeight={1}
        fontSize={2}
        fontWeight="bold"
        as="h3"
        py={1}
        color="black"
      >
        {title}
      </Text>
      <Text fontFamily="sans" lineHeight={1} color="black" as="p">
        {catalogPriceLabel} {minDisplayPrice}{' '}
        {hasPriceRange && `- ${maxDisplayPrice}`}
      </Text>
    </Box>
  );
};

export default IndividualProduct;
