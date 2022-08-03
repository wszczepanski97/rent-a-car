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

const nameValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  minLength: [isShorterThan(2), "Wprowadź co najmniej 2 litery"],
  maxLength: [isLongerThan(32), "Nie możesz wprowadzić więcej niż 32 litery"],
  onlyLetters: [isOnlyLetters, "Dozwolone są tylko litery"],
};
const vehicleRegistrationNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validVehicleRegistrationNumber: [
    isVehicleRegistrationNumber,
    "Wprowadzono niepoprawny numer rejestracyjny pojazdu.\nNumer rejestracyjny musi rozpoczynać się od litery oraz 4-7 następujących po nim cyfr lub liter.",
  ],
};
const VINNumberValidationRule: Object = {
  required: [true, "To pole jest wymagane"],
  validVINNumber: [
    isValidVINNumber,
    "Wprowadzono niepoprawny numer VIN.\nPoprawny format to 17 następujących po sobie cyfr lub liter.",
  ],
};

export {
  nameValidationRule,
  vehicleRegistrationNumberValidationRule,
  VINNumberValidationRule,
};
