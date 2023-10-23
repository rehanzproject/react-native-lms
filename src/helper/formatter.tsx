export const makeRupiahValue = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumSignificantDigits: 1,
  }).format(price);

export const transformDate = (date: string) =>
  Intl.DateTimeFormat('en-gb', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
