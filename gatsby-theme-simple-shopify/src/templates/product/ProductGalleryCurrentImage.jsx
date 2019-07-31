import React from 'react';
import GatsbyImage from 'gatsby-image';
import { useCurrentImageContext } from './CurrentImageContext';

function ProductGalleryCurrentImage({ images }) {
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
export default ProductGalleryCurrentImage;
