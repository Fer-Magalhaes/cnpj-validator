import { newReadline } from "./util/readline";
import { REGEX, WEIGHTS } from "./util/constants"; 

const stripNonDigits = (value: string) => value.replace(REGEX.NON_DIGITS, "");
const computeCheckDigit = (base: string, weights: number[]): number => {
  const sum = [...base].reduce((total, digit, idx) => total + +digit * weights[idx], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
};
function isValidCnpj(input: string | number | number[]): boolean {
  const numericDigits = stripNonDigits(Array.isArray(input) ? input.join("") : String(input));
  if (numericDigits.length !== 14 || REGEX.REPEATED_DIGITS.test(numericDigits)) return false;

  const digitFirstCheck  = computeCheckDigit(numericDigits.slice(0, 12), WEIGHTS.WEIGHTS_FIRST_CHECK);
  if (digitFirstCheck !== +numericDigits[12]) return false;

  const digitSecondCheck = computeCheckDigit(numericDigits.slice(0, 12) + digitFirstCheck, WEIGHTS.WEIGHTS_SECOND_CHECK);
  return digitSecondCheck === +numericDigits[13];
};
function main() {
  const readline = newReadline();
  readline.question("Digite o CNPJ: ").then((input) => {
    const isValid = isValidCnpj(input);
    console.log(`O CNPJ ${input} é ${isValid ? "válido" : "inválido"}.`);
    readline.close();
  });
}
main();