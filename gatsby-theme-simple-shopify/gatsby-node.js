const path = require('path');
const productTemplate = path.resolve('src/templates/product/index.jsx');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    graphql(`
      {
        products: allShopifyProduct {
          nodes {
            handle
          }
        }
      }
    `).then(result => {
      result.data.products.nodes.forEach(({ handle }) => {
        createPage({
          path: `/product/${handle}`,
          component: productTemplate,
          context: {
            handle,
          },
        });
      });
      resolve();
    });
  });
};
