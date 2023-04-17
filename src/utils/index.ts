export function unitPriceFormat(price: number) {
  return '¥' + Number(price).toFixed(2);
}