import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isPassportNumberValidator from "validator/lib/isPassportNumber";

type IsPassportNumberBrand<T extends string> = {
  readonly [K in `IsPassportNumber_${T}`]: symbol;
};

type CountryCodes =
  | "AM"
  | "AR"
  | "AT"
  | "AU"
  | "BE"
  | "BG"
  | "BY"
  | "BR"
  | "CA"
  | "CH"
  | "CN"
  | "CY"
  | "CZ"
  | "DE"
  | "DK"
  | "DZ"
  | "EE"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "GR"
  | "HR"
  | "HU"
  | "IE"
  | "IN"
  | "IR"
  | "ID"
  | "IS"
  | "IT"
  | "JP"
  | "KR"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MT"
  | "MY"
  | "MZ"
  | "NL"
  | "PL"
  | "PT"
  | "RO"
  | "RU"
  | "SE"
  | "SL"
  | "SK"
  | "TR"
  | "UA"
  | "US";

/**
 * Check if the string is a valid passport number relative to a specific country code.
 */
export const IsPassportNumber = <T extends CountryCodes>(locale: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsPassportNumberBrand<T>> =>
        isPassportNumberValidator(value, locale),
      ("IsPassportNumber_" + locale) as `IsPassportNumber_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be valid passport number`
  );
