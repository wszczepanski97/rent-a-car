import { getValue } from "@syncfusion/ej2-base";
import XRegExp from "xregexp";

const inputIsRequired = (input: string) => input.length !== 0;
export const inputRequiredRule = {
  validator: inputIsRequired,
  message: "To pole jest wymagane",
};

const isShorterThan = (minLength: number) => (args: any) =>
  getValue("value", args).length >= minLength;
const isLongerThan = (maxLength: number) => (args: any) =>
  getValue("value", args).length <= maxLength;
const isOnlyLetters = (args: any) =>
  XRegExp("^\\p{L}*$").test(getValue("value", args));
const syncfusionIsValidEmail = (args: any) =>
  /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(getValue("value", args));
const inputIsValidEmail = (input: string) =>
  /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(input);
const syncfusionIsValidIDNumber = (args: any) =>
  /^[a-zA-Z]{3}\d{6}$/.test(getValue("value", args));
const inputIsValidIDNumber = (input: string) =>
  /^[a-zA-Z]{3}\d{6}$/.test(input);
const syncfusionIsValidDrivingLicenseNumberRule = (args: any) =>
  /^\d{5}\/\d{2}\/\d{4,9}/.test(getValue("value", args));
const inputIsValidDrivingLicenseNumberRule = (input: string) =>
  /^\d{5}\/\d{2}\/\d{4,9}/.test(input);
const syncfusionisValidPhoneNumberRule = (args: any) =>
  /^[0-9]{9}$/.test(getValue("value", args));
const inputisValidPhoneNumberRule = (input: string) => /^[0-9]{9}$/.test(input);
const syncfusionIsPeselLengthValid = (args: any) =>
  /^[0-9]{11}$/.test(getValue("value", args));
const inputIsPeselLengthValid = (input: string) => /^[0-9]{11}$/.test(input);
const syncfusionIsPeselChecksumValidRule = (args: any) => {
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
const inputIsPeselChecksumValidRule = (input: string) => {
  const digits = ("" + input).split("");
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
  console.log(doKiedyValue);
  if (!doKiedyValue) return true;
  const odKiedyValue = (
    document.querySelector('[name="oddzialy_hist___OdKiedy"]') as HTMLElement
  ).getAttribute("value");
  return odKiedyValue
    ? !(new Date(odKiedyValue).getTime() > new Date(doKiedyValue).getTime())
    : false;
};

const syncfusionNameValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  minLength: [isShorterThan(2), "Wprowadź co najmniej 2 litery"],
  maxLength: [isLongerThan(32), "Nie możesz wprowadzić więcej niż 32 litery"],
  onlyLetters: [isOnlyLetters, "Dozwolone są tylko litery"],
};
const syncfusionEmailValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validEmail: [syncfusionIsValidEmail, "Wprowadzono zły adres email"],
};

export const inputEmailValidationRule = {
  required: inputRequiredRule,
  validEmail: {
    validator: inputIsValidEmail,
    message: "Niepoprawny adres email",
  },
};

const syncfusionIDNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validIDNumber: [
    syncfusionIsValidIDNumber,
    "Wprowadzono niepoprawny numer dowodu osobistego.\nPoprawny format to 3 litery i następujące po nich 6 cyfr.",
  ],
};

export const inputIDNumberValidationRule = {
  required: inputRequiredRule,
  validIDNumber: {
    validator: inputIsValidIDNumber,
    message:
      "Wprowadzono niepoprawny numer dowodu osobistego.\nPoprawny format to 3 litery i następujące po nich 6 cyfr.",
  },
};

const syncfusionDrivingLicenseNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validDrivingLicenseNumber: [
    syncfusionIsValidDrivingLicenseNumberRule,
    "Wprowadzono niepoprawny numer prawa jazdy.\nPoprawny format to XXXXX/YY/ZZZZZZZZ. Wszystkie znaki są cyframi.",
  ],
};

export const inputDrivingLicenseNumberValidationRule = {
  required: inputRequiredRule,
  validDrivingLicenseNumber: {
    validator: inputIsValidDrivingLicenseNumberRule,
    message:
      "Wprowadzono niepoprawny numer prawa jazdy.\nPoprawny format to XXXXX/YY/ZZZZZZZZ. Wszystkie znaki są cyframi.",
  },
};

const syncfusionPhoneNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validPhoneNumber: [
    syncfusionisValidPhoneNumberRule,
    "Wprowadzono niepoprawny numer telefonu.\nProsimy o wprowadzenie 9 cyfr.",
  ],
};
export const inputPhoneNumberValidationRule = {
  required: inputRequiredRule,
  validPhoneNumber: {
    validator: inputisValidPhoneNumberRule,
    message:
      "Wprowadzono niepoprawny numer telefonu.\nProsimy o wprowadzenie 9 cyfr.",
  },
};
const syncfusionPeselNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  invalidLength: [
    syncfusionIsPeselLengthValid,
    "Pesel musi składać się z 11 cyfr.",
  ],
  invalidChecksum: [
    syncfusionIsPeselChecksumValidRule,
    "Wprowadzony pesel ma nieprawidłowy format. Upewnij się że wprowadziłeś poprawne dane.",
  ],
};
export const inputPeselNumberValidationRule = {
  required: inputRequiredRule,
  invalidLength: {
    validator: inputIsPeselLengthValid,
    message: "Pesel musi składać się z 11 cyfr.",
  },
  invalidChecksum: {
    validator: inputIsPeselChecksumValidRule,
    message:
      "Wprowadzony pesel ma nieprawidłowy format. Upewnij się że wprowadziłeś poprawne dane.",
  },
};
const endOfContractValidationRule: Object = {
  beforeBeginOfContract: [
    isEndOfContractNotBeforeBegin,
    "Umowa nie może skończyć się przed jej rozpoczęciem.",
  ],
};

// conajmniej 8 znaków, w tym 1 mała litera, 1 duza litera, 1 cyfra, 1 znak specjalny
const hasPasswordWhitespaces = (input: string) => !/\s/.test(input);
const hasPasswordOneUppercase = (input: string) => /^(?=.*[A-Z])/.test(input);
const hasPasswordOneLowercase = (input: string) => /^(?=.*[a-z])/.test(input);
const hasPasswordOneNumber = (input: string) => /^(?=.*[0-9])/.test(input);
const hasPasswordOneSymbol = (input: string) =>
  /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/.test(input);
const hasPasswordMoreThan8Chars = (input: string) => /^.{8,}$/.test(input);

export const inputPasswordValidationRule = {
  required: inputRequiredRule,
  uppercase: {
    validator: hasPasswordOneUppercase,
    message: "Hasło musi posiadać conajmniej 1 dużą literę.",
  },
  lowercase: {
    validator: hasPasswordOneLowercase,
    message: "Hasło musi posiadać conajmniej 1 małą literę.",
  },
  number: {
    validator: hasPasswordOneNumber,
    message: "Hasło musi posiadać conajmniej 1 cyfrę.",
  },
  symbol: {
    validator: hasPasswordOneSymbol,
    message: `Hasło musi posiadać conajmniej 1 znak specjalny(~,\`,!,@,#,$,%,^,&,*,(,),-,+, =,{},\,;,",',<>,.,?,/,_,₹).`,
  },
  whitespaces: {
    validator: hasPasswordWhitespaces,
    message: "Hasło nie może zawierac spacji.",
  },
  atLeast8Chars: {
    validator: hasPasswordMoreThan8Chars,
    message: `Hasło musi posiadać conajmniej 8 znaków.`,
  },
};

export {
  syncfusionNameValidationRule,
  syncfusionEmailValidationRule,
  syncfusionIDNumberValidationRule,
  syncfusionDrivingLicenseNumberValidationRule,
  syncfusionPhoneNumberValidationRule,
  syncfusionPeselNumberValidationRule,
  endOfContractValidationRule,
};
