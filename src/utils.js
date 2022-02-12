// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat

export const currentCurrency = 'USD';

export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: currentCurrency,
  style: 'currency',
  minimumFractionDigits: 0,
  currencyDisplay: 'narrowSymbol',
});
