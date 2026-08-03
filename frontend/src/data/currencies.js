export const currencies = {
  PKR: { code: 'PKR', symbol: 'Rs.', rate: 1, label: 'PKR (Rs.)' },
  USD: { code: 'USD', symbol: '$', rate: 0.0036, label: 'USD ($)' },
  AED: { code: 'AED', symbol: 'AED', rate: 0.013, label: 'AED (Dirham)' }
};

export const formatPrice = (priceInPKR, currencyCode = 'PKR') => {
  const curr = currencies[currencyCode] || currencies.PKR;
  const converted = (priceInPKR * curr.rate).toFixed(curr.code === 'PKR' ? 0 : 2);
  return `${curr.symbol} ${Number(converted).toLocaleString()}`;
};
