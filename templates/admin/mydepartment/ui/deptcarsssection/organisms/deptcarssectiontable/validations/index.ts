import { getValue } from "@syncfusion/ej2-base";
import XRegExp from "xregexp";

const isShorterThan = (minLength: number) => (args: any) =>
  getValue("value", args).length >= minLength;
const isLongerThan = (maxLength: number) => (args: any) =>
  getValue("value", args).length <= maxLength;
const isOnlyLetters = (args: any) =>
  XRegExp("^\\p{L}*$").test(getValue("value", args));
const isVehicleRegistrationNumber = (args: any) =>
  /^[A-Z]{1}[A-Z0-9]{4,7}$/.test(getValue("value", args));
const isValidVINNumber = (args: any) =>
  /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/.test(getValue("value", args));
const isBiggerThan = (min: number) => (args: any) => {
  console.log(getValue("value", args));
  return getValue("value", args) >= min;
};

const requiredFieldRule = { required: [true, "To pole jest wymagane"] };
const nameValidationRule: Object = {
  ...requiredFieldRule,
  minLength: [isShorterThan(2), "Wprowadź co najmniej 2 litery"],
  maxLength: [isLongerThan(32), "Nie możesz wprowadzić więcej niż 32 litery"],
  onlyLetters: [isOnlyLetters, "Dozwolone są tylko litery"],
};
const vehicleRegistrationNumberValidationRule: Object = {
  ...requiredFieldRule,
  validVehicleRegistrationNumber: [
    isVehicleRegistrationNumber,
    "Wprowadzono niepoprawny numer rejestracyjny pojazdu.\nNumer rejestracyjny musi rozpoczynać się od litery oraz 4-7 następujących po nim cyfr lub liter.",
  ],
};
const VINNumberValidationRule: Object = {
  ...requiredFieldRule,
  validVINNumber: [
    isValidVINNumber,
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
  nameValidationRule,
  vehicleRegistrationNumberValidationRule,
  VINNumberValidationRule,
  priceForDayValidationRule,
  carMileageValidationRule,
};
