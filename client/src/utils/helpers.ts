export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// export const getDate = (dateStr: string): string => {
//   const date = new Date(dateStr);
//   const options: Intl.DateTimeFormatOptions = {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   };
//   return date.toLocaleDateString('sv', options);
// };

export const getDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};
