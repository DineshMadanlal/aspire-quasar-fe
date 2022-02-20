export const randomFixedInteger = (length) => Math.floor(
  10 ** (length - 1) + Math.random() * (10 ** length - 10 ** (length - 1) - 1),
);

/** generate random year between 2023 to 2028 */
export const randomYear = () => Math.ceil(Math.random() * (2028 - 2023) + 2023);

/** two digit random month */
export const randomMonth = () => Math.ceil(Math.random() * (12 - 1) + 1).toString().padStart(2, '0');
