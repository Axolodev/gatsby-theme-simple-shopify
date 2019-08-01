import strings from '../config.json';
const { locales, currency } = strings;

export default function formatPrice(price) {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(price);
}
