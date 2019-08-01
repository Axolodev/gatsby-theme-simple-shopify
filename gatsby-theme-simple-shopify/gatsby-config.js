module.exports = ({ shopName, accessToken }) => ({
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName,
        accessToken,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
  ],
});
