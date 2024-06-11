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
export const transformDates = (dateString: string) => {
  let dateObj = new Date(dateString);
  let formattedDate = dateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formattedDate;
};
export const transformInvoice = (dateString : string) => {

// Parse the date string
let dateObj = new Date(dateString);

// Convert to the desired date format
let year = dateObj.getUTCFullYear();
let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
let day = String(dateObj.getUTCDate()).padStart(2, '0');

// Combine with the static parts
let formattedDate = `${year}${month}${day}-XD-12020000000847`;
return formattedDate
}