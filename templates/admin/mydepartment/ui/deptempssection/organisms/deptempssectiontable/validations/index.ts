import { getValue } from "@syncfusion/ej2-base";
import XRegExp from "xregexp";

const isShorterThan = (minLength: number) => (args: any) =>
  getValue("value", args).length >= minLength;
const isLongerThan = (maxLength: number) => (args: any) =>
  getValue("value", args).length <= maxLength;
const isOnlyLetters = (args: any) =>
  XRegExp("^\\p{L}*$").test(getValue("value", args));
const isValidEmail = (args: any) =>
  /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(getValue("value", args));
const isValidIDNumber = (args: any) =>
  /^[a-zA-Z]{3}\d{6}$/.test(getValue("value", args));
const isValidDrivingLicenseNumberRule = (args: any) =>
  /^\d{5}\/\d{2}\/\d{4,9}/.test(getValue("value", args));
const isValidPhoneNumberRule = (args: any) =>
  /^[0-9]{9}$/.test(getValue("value", args));
const isPeselLengthValid = (args: any) =>
  /^[0-9]{11}$/.test(getValue("value", args));
const isPeselChecksumValidRule = (args: any) => {
  const pesel = getValue("value", args);
  const digits = ("" + pesel).split("");
  let checksum =
    (1 * parseInt(digits[0]) +
      3 * parseInt(digits[1]) +
      7 * parseInt(digits[2]) +
      9 * parseInt(digits[3]) +
      1 * parseInt(digits[4]) +
      3 * parseInt(digits[5]) +
      7 * parseInt(digits[6]) +
      9 * parseInt(digits[7]) +
      1 * parseInt(digits[8]) +
      3 * parseInt(digits[9])) %
    10;
  if (checksum == 0) checksum = 10;
  checksum = 10 - checksum;
  return parseInt(digits[10]) == checksum;
};
const isEndOfContractNotBeforeBegin = (args: any) => {
  const doKiedyValue = getValue("value", args);
  if (!doKiedyValue) return true;
  const odKiedyValue = (
    document.querySelector('[name="oddzialy_hist___OdKiedy"]') as Element
  ).value;
  return !(new Date(odKiedyValue).getTime() > new Date(doKiedyValue).getTime());
};

const nameValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  minLength: [isShorterThan(2), "Wprowadź co najmniej 2 litery"],
  maxLength: [isLongerThan(32), "Nie możesz wprowadzić więcej niż 32 litery"],
  onlyLetters: [isOnlyLetters, "Dozwolone są tylko litery"],
};
const emailValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validEmail: [isValidEmail, "Wprowadzono zły adres email"],
};
const IDNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validIDNumber: [
    isValidIDNumber,
    "Wprowadzono niepoprawny numer dowodu osobistego.\nPoprawny format to 3 litery i następujące po nich 6 cyfr.",
  ],
};
const drivingLicenseNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validDrivingLicenseNumber: [
    isValidDrivingLicenseNumberRule,
    "Wprowadzono niepoprawny numer prawa jazdy.\nPoprawny format to XXXXX/YY/ZZZZZZZZ. Wszystkie znaki są cyframi.",
  ],
};
const phoneNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validDrivingLicenseNumber: [
    isValidPhoneNumberRule,
    "Wprowadzono niepoprawny numer telefonu.\nProsimy o wprowadzenie 9 cyfr.",
  ],
};
const peselNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  invalidLength: [isPeselLengthValid, "Pesel musi składać się z 11 cyfr."],
  invalidChecksum: [
    isPeselChecksumValidRule,
    "Wprowadzony pesel ma nieprawidłowy format. Upewnij się że wprowadziłeś poprawne dane.",
  ],
};
const endOfContractValidationRule: Object = {
  beforeBeginOfContract: [
    isEndOfContractNotBeforeBegin,
    "Umowa nie może skończyć się przed jej rozpoczęciem.",
  ],
};

export {
  nameValidationRule,
  emailValidationRule,
  IDNumberValidationRule,
  drivingLicenseNumberValidationRule,
  phoneNumberValidationRule,
  peselNumberValidationRule,
  endOfContractValidationRule,
};
