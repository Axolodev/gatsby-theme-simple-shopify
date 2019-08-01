import React from 'react';
import CartPage from './CartPage';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';

export default props => {
  const {
    pageContext: { title },
  } = props;
  return (
    <Layout>
      <Helmet title={title} />
      <CartPage {...props} />
    </Layout>
  );
};
