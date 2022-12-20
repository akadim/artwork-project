const CURRENCY_FORMATTER = Intl.NumberFormat(undefined, {currency: 'USD', style: 'currency'});

const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};

export default formatCurrency;