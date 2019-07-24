module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: 'test-store-octatum',
        accessToken: '00fda704f631a8a2df2c7621bb1bde8c',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
