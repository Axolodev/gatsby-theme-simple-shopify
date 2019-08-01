module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-simple-shopify',
      options: {
        shopName: 'test-store-octatum',
        accessToken: '00fda704f631a8a2df2c7621bb1bde8c',
        basePath: '/store',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
  ],
};
