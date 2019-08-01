Gatsby Theme Simple Shopify is gatsby theme created for the Gatsby themejam 2019.
It is designed to add a simple Shopify Store to any existing Gatsby website.

[Demo](https://gatsby-theme-simple-shopify.netlify.com/)

- [Installation](#installation)
- [Usage](#usage)
  - [Theming your... err... theme](#theming-your-err-theme)
  - [Adding navigation to the default pages (e.g. a Navbar)](#adding-navigation-to-the-default-pages-eg-a-navbar)
    - [Option 1. Overriding the Layout.jsx component](#option-1-overriding-the-layoutjsx-component)
    - [Option 2. Overriding the page templates](#option-2-overriding-the-page-templates)
  - [Changing the default strings](#changing-the-default-strings)
  - [Plugin options](#plugin-options)
    - [Modifying the currency locales](#modifying-the-currency-locales)
- [Additional notes](#additional-notes)

## Installation

Add this to your gatsby site by using 
```
npm install gatsby-theme-simple-shopify
// or 
yarn add gatsby-theme-simple-shopify
```

Then include it into your `gatsby-config.js` file by adding it to your plugins:
```
plugins: [
  {
    resolve: 'gatsby-theme-simple-shopify',
    options: {
      shopName: process.env.GATSBY_SHOP_NAME,
      accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
      basePath: '/',
    },
  }
],
```

> You must have both a `GATSBY_SHOP_NAME` and a `GATSBY_SHOPIFY_ACCESS_TOKEN` 
> configured in your `process.env` variable for this to work properly. Without
> this, `shopify-buy` will not be able to connect to your store. Check out the
> [example site's gatsby-config.js file](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/site/gatsby-config.js) 
> for an example.

## Usage

Note: All components that include some sort of JSX export have a .jsx extension.
Example: [Layout.jsx](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/gatsby-theme-simple-shopify/src/components/Layout.jsx)

### Theming your... err... theme

This Gatsby-theme was created using the power of 
[Styled Components](https://www.styled-components.com/) and 
[Rebass](https://rebassjs.org/). Because of this, you can override the
default theme by shadowing the `theme.js` file found in the root of the `src/`
directory. Here's how to do this:

1. Create a `theme.js` file in your `src/` directory. 
[Here are the default values for the file](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/gatsby-theme-simple-shopify/src/theme.js)
2. Create a `gatsby-theme-simple-shopify` folder in your `src/` directory.
3. Import the `theme.js` file created in step 1, then export it as default.

Example:
```
import theme from '../theme';

export default theme;
```

### Adding navigation to the default pages (e.g. a Navbar)

To include navigation components such as a Navbar, a Footer or any other element
there's two options:

#### Option 1. Overriding the Layout.jsx component

This component's only job is to include a Styled Components' `ThemeProvider`
with its corresponding theme. You can change this by creating your own
Layout component and then shadowing the Layout.jsx file found in 
`gatsby-theme-simple-shopify/components/Layout.jsx`. 
[Example](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/site/src/gatsby-theme-simple-shopify/components/Layout.jsx "How the example site overrides the Layout.jsx component")

#### Option 2. Overriding the page templates

All page templates are stored in the [theme's templates folder](https://github.com/RobRuizR/gatsby-theme-simple-shopify/tree/master/gatsby-theme-simple-shopify/src/templates). 

They are all structured in the following way:

- An index.jsx file that exports the page component and its corresponding page
query. This file also sets the title using the page `pageTitle` or, in the case
of a Product Page, the `pageTitleTemplate` which are extracted from a 
`strings.json` file found in the same folder. Read more in the 
[Changing the default strings](#changing-the-default-strings) section.
[Example](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/gatsby-theme-simple-shopify/src/templates/product/index.jsx "Example of an index component in a page template.") 
- A Page component which sets the general structure for the page. 
[Example page component](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/gatsby-theme-simple-shopify/src/templates/product/ProductPage.jsx)
- A strings.json file that determines the strings for that page. 
- Several other components that create the page structure.

This structure may seem complex, but it makes it easier to shadow single
components instead of whole pages. As an example, you could change how the
description looks in a product by shadowing the [DescriptionBox component](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/gatsby-theme-simple-shopify/src/templates/product/DescriptionBox.jsx).

### Changing the default strings 

All page components, plus the `ProductCounter` component, include a 
`strings.json` file which stores the strings used for the theme. This includes:
- Page titles
- Headers
- Aria labels
- Button labels
- Other strings, like the "Price:" label seen in a product page.

By shadowing these you could make small modifications that fit up your website's
look and feel or even change the language for the whole store.

### Plugin options

```
{
  // Both of these values should be included in your process.env as explained
  // in the Installation section, as the theme uses them to access your store.
  // You'll probably be using them as follows:
  shopName: process.env.GATSBY_SHOP_NAME,
  accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,

  // Optional. Defaults to "/". Use this to set the base path for all the pages
  // created by this theme.
  basePath: "/",
}
```

#### Modifying the currency locales 

The default currency and locales are both set in the [config.json](https://github.com/RobRuizR/gatsby-theme-simple-shopify/blob/master/gatsby-theme-simple-shopify/src/config.json) file and then formatted using the
[Intl.NumberFormat API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

Multiple Locales are not currently supported.

## Additional notes

**You cannot use product variants for your shopify products.** This is a
feature which will be added in a future build.