export const REGEX = {
  NON_DIGITS: /\D/g,
  REPEATED_DIGITS: /^(\d)\1{13}$/,
};

export const WEIGHTS = {
  WEIGHTS_FIRST_CHECK: [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  WEIGHTS_SECOND_CHECK: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
};