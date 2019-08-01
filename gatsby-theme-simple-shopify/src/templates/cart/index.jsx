import React from 'react';
import CartPage from './CartPage';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import strings from './strings.json';

const { pageTitle } = strings;

export default props => {
  return (
    <Layout>
      <Helmet title={pageTitle} />
      <CartPage {...props} />
    </Layout>
  );
};
