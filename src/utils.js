// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'usd',
  style: 'currency',
  minimumFractionDigits: 0,
});
