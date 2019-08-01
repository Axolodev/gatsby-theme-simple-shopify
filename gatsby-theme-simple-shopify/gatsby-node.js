const path = require('path');
const productTemplate = require.resolve('./src/templates/product/index.jsx');
const cartTemplate = require.resolve('./src/templates/cart/index.jsx');
const catalogTemplate = require.resolve('./src/templates/catalog/index.jsx');

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '');
}

exports.onCreateNode = ({ node, actions }, options) => {
  if (node.internal.type === `ShopifyProduct`) {
    let { basePath = '', productPageBasePath = 'product' } = options;
    const { createNodeField } = actions;
    basePath = removeTrailingLeadingSlashes(basePath);
    productPageBasePath = removeTrailingLeadingSlashes(productPageBasePath);

    // Todo: Improve the way this is done. Maybe using the config.json file.
    createNodeField({
      node,
      name: 'shopifyThemePath',
      value: `${basePath && `/${basePath}`}/${productPageBasePath}/${
        node.handle
      }`,
    });
  }
};

exports.createPages = async ({ graphql, actions }, options) => {
  const { createPage } = actions;

  let {
    cartPagePath = 'cart',
    catalogPagePath = 'catalog',
    basePath = '',
  } = options;

  basePath = removeTrailingLeadingSlashes(basePath);
  cartPagePath = removeTrailingLeadingSlashes(cartPagePath);
  catalogPagePath = removeTrailingLeadingSlashes(catalogPagePath);
  const finalCartPagePath = `${basePath && `/${basePath}`}/${cartPagePath}`;
  const finalCatalogPagePath = `${basePath &&
    `/${basePath}`}/${catalogPagePath}`;

  createPage({
    path: finalCartPagePath,
    component: cartTemplate,
  });

  createPage({
    path: finalCatalogPagePath,
    component: catalogTemplate,
  });

  const result = await graphql(`
    {
      products: allShopifyProduct {
        nodes {
          handle
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `);
  result.data.products.nodes.forEach(({ handle, fields }) => {
    const { shopifyThemePath } = fields;
    createPage({
      path: shopifyThemePath,
      component: productTemplate,
      context: {
        handle,

        // Todo: Find a better way to do this.
        cartUrl: finalCartPagePath,
      },
    });
  });
};
