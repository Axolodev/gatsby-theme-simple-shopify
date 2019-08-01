import React, { createContext, useContext, useEffect, useReducer } from 'react';
import shopify from 'shopify-buy';
import useLocalStorage from 'react-use/lib/useLocalStorage';

const persistedStateId = 'shopifyCheckout';

const client = shopify.buildClient({
  domain: `${process.env.GATSBY_SHOP_NAME ||
    'test-store-octatum'}.myshopify.com`,
  storefrontAccessToken:
    process.env.GATSBY_SHOPIFY_ACCESS_TOKEN ||
    '00fda704f631a8a2df2c7621bb1bde8c',
});

const ShopifyClientContext = createContext(null);

const useShopifyClient = () => {
  const client = useContext(ShopifyClientContext);
  return client;
};

const shopifyActions = {
  setLoading: 'set_loading',
  setCheckout: 'set_checkout',
};

function shopifyCheckoutReducer(_, action) {
  switch (action.type) {
    case shopifyActions.setLoading:
      return { loaded: false };
    case shopifyActions.setCheckout:
      const { lineItems = [], subtotalPrice = 0, webUrl = '' } = action.payload;
      return { lineItems, subtotalPrice, webUrl, loaded: true };
    default:
      throw new Error(`Action of type ${action.type} does not exist.`);
  }
}

const useShopifyFunctions = () => {
  const client = useShopifyClient();
  const [shopifyCheckoutId, setShopifyCheckoutId] = useLocalStorage(
    persistedStateId,
    ''
  );
  const [checkout, dispatch] = useReducer(shopifyCheckoutReducer, {
    loaded: false,
    subtotalPrice: 0,
    lineItems: [],
    webUrl: '',
  });

  async function addItem({ variantId, quantity }) {
    const temporalCheckout = await client.checkout.addLineItems(
      shopifyCheckoutId,
      [{ variantId, quantity }]
    );

    dispatch({ type: shopifyActions.setCheckout, payload: temporalCheckout });
  }

  async function removeItem(variantId) {
    const temporalCheckout = await client.checkout.removeLineItems(
      shopifyCheckoutId,
      [variantId]
    );

    dispatch({ type: shopifyActions.setCheckout, payload: temporalCheckout });
  }

  function resetCart() {
    setShopifyCheckoutId('');
    dispatch({ type: shopifyActions.setLoading });
  }

  async function updateItem({ id, quantity }) {
    const temporalCheckout = await client.checkout.updateLineItems(
      shopifyCheckoutId,
      [
        {
          id,
          quantity,
        },
      ]
    );

    dispatch({ type: shopifyActions.setCheckout, payload: temporalCheckout });
  }

  useEffect(() => {
    async function createNewCheckout() {
      const checkout = await client.checkout.create();
      setShopifyCheckoutId(checkout.id);
      return checkout;
    }

    async function checkCartExistance() {
      let temporalCheckout = null;
      if (shopifyCheckoutId === '') {
        temporalCheckout = createNewCheckout();
      } else {
        temporalCheckout = await client.checkout.fetch(shopifyCheckoutId);
        if (temporalCheckout === null) {
          temporalCheckout = createNewCheckout();
        }
      }

      dispatch({ type: shopifyActions.setCheckout, payload: temporalCheckout });
    }

    checkCartExistance();
  }, [shopifyCheckoutId, setShopifyCheckoutId, client.checkout]);

  return {
    addItem,
    removeItem,
    resetCart,
    updateItem,
    checkout,
  };
};

function ShopifyClientProvider({ children }) {
  return (
    <ShopifyClientContext.Provider value={client}>
      {children}
    </ShopifyClientContext.Provider>
  );
}

export { ShopifyClientProvider, useShopifyFunctions };
