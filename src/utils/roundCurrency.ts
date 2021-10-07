export function roundCurrency(data: string) {
  data = data.replace(/\D/g, '');
  const num = Number(data)/100;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
