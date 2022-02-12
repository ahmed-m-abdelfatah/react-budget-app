// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: JSON.parse(localStorage.getItem('currentCurrency')) ?? 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
  currencyDisplay: 'narrowSymbol',
});
