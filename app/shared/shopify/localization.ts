import {useLocalizedFormatting} from '@quilted/quilt/localize';

export interface MoneyBasic {
  amount: string;
  currencyCode: string;
}

export function useFormatMoney() {
  const format = useLocalizedFormatting();

  return function formatMoney(
    money: MoneyBasic,
    options?: Parameters<(typeof format)['formatCurrency']>[1],
  ) {
    return format.formatCurrency(Number(money.amount), {
      currency: money.currencyCode,
      ...options,
    });
  };
}
