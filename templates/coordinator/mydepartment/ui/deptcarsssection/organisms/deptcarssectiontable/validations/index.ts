import { getValue } from "@syncfusion/ej2-base";
import { inputRequiredRule } from "templates/coordinator/mydepartment/ui/deptempssection/organisms/deptempssectiontable/validations";
import XRegExp from "xregexp";

export const inputIsShorterThan = (minLength: number) => (input: string) =>
  input.length >= minLength;
const syncfusionIsShorterThan = (minLength: number) => (args: any) =>
  getValue("value", args).length >= minLength;
export const inputIsLongerThan = (maxLength: number) => (input: string) =>
  input.length <= maxLength;
const syncfusionIsLongerThan = (maxLength: number) => (args: any) =>
  getValue("value", args).length <= maxLength;
const syncfusionIsOnlyLetters = (args: any) =>
  XRegExp("^\\p{L}*$").test(getValue("value", args));
export const inputIsOnlyLetters = (inputText: string) =>
  XRegExp("^\\p{L}*$").test(inputText);
const syncfusionIsVehicleRegistrationNumber = (args: any) =>
  /^[A-Z]{1}[A-Z0-9]{4,7}$/.test(getValue("value", args));
export const inputIsVehicleRegistrationNumber = (inputText: string) =>
  /^[A-Z]{1}[A-Z0-9]{4,7}$/.test(inputText);
const syncfusionIsValidVINNumber = (args: any) =>
  /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/.test(getValue("value", args));
export const inputIsValidVINNumber = (inputText: string) =>
  /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/.test(inputText);
const isBiggerThan = (min: number) => (args: any) =>
  getValue("value", args) >= min;

const requiredFieldRule = { required: [true, "To pole jest wymagane"] };
export const inputRequiredFieldRule = {
  required: inputRequiredRule,
};

const syncfusionNameValidationRule: Object = {
  ...requiredFieldRule,
  minLength: [syncfusionIsShorterThan(2), "Wprowadź minimum 2 litery"],
  maxLength: [
    syncfusionIsLongerThan(32),
    "Nie możesz wprowadzić więcej niż 32 litery",
  ],
  onlyLetters: [syncfusionIsOnlyLetters, "Dozwolone są tylko litery"],
};
export const inputNameValidationRule = {
  required: inputRequiredRule,
  minLength: {
    validator: inputIsShorterThan(2),
    message: "Wprowadź minimum 2 litery",
  },
  maxLength: {
    validator: inputIsLongerThan(32),
    message: "Nie możesz wprowadzić więcej niż 32 litery",
  },
  onlyLetters: {
    validator: inputIsOnlyLetters,
    message: "Dozwolone są tylko litery",
  },
};

export const inputLoginValidationRule = {
  required: inputRequiredRule,
  minLength: {
    validator: inputIsShorterThan(5),
    message: "Wprowadź co najmniej 5 znaków",
  },
  maxLength: {
    validator: inputIsLongerThan(20),
    message: "Nie możesz wprowadzić więcej niż 20 znaków/",
  },
};
const syncfusionRegistrationNumberValidationRule: Object = {
  ...requiredFieldRule,
  validVehicleRegistrationNumber: [
    syncfusionIsVehicleRegistrationNumber,
    "Wprowadzono niepoprawny numer rejestracyjny pojazdu.\nNumer rejestracyjny musi rozpoczynać się od litery oraz 4-7 następujących po nim cyfr lub liter.",
  ],
};
export const inputRegistrationNumberValidationRule: Object = {
  required: inputRequiredRule,
  validVehicleRegistrationNumber: [
    inputIsVehicleRegistrationNumber,
    "Wprowadzono niepoprawny numer rejestracyjny pojazdu.\nNumer rejestracyjny musi rozpoczynać się od litery oraz 4-7 następujących po nim cyfr lub liter.",
  ],
};
const syncfusionVINNumberValidationRule: Object = {
  ...requiredFieldRule,
  validVINNumber: [
    syncfusionIsValidVINNumber,
    "Wprowadzono niepoprawny numer VIN.\nPoprawny format to 17 następujących po sobie cyfr lub liter.",
  ],
};

export const inputVINNumberValidationRule: Object = {
  required: inputRequiredRule,
  validVINNumber: [
    inputIsValidVINNumber,
    "Wprowadzono niepoprawny numer VIN.\nPoprawny format to 17 następujących po sobie cyfr lub liter.",
  ],
};

const priceForDayValidationRule: Object = {
  ...requiredFieldRule,
  min: [isBiggerThan(1), "Cena za dzień musi być większa niż 0"],
};

const carMileageValidationRule: Object = {
  ...requiredFieldRule,
  min: [isBiggerThan(0), "Przebieg samochodu nie może być ujemny."],
};

export {
  requiredFieldRule,
  syncfusionNameValidationRule,
  syncfusionRegistrationNumberValidationRule,
  syncfusionVINNumberValidationRule,
  priceForDayValidationRule,
  carMileageValidationRule,
};
