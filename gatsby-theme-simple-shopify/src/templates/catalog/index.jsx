import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import CatalogPage from './CatalogPage';
import strings from './strings.json';

const { pageTitle } = strings;

export default props => {
  return (
    <Layout>
      <Helmet title={pageTitle} />
      <CatalogPage {...props} />
    </Layout>
  );
};

export const catalogQuery = graphql`
  query CatalogQuery {
    allShopifyProduct {
      nodes {
        id
        title
        handle
        fields {
          shopifyThemePath
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 320) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
