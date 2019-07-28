export default function formatPrice(price, options = {}) {
  const { locales = 'es-MX', currency = 'MXN' } = options;

  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(price);
}
