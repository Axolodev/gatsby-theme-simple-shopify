require('dotenv').config({
  path: `.env`,
});
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-simple-shopify',
      options: {
        shopName: process.env.GATSBY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        basePath: '/store',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
  ],
};
