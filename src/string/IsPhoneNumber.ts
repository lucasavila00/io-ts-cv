import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

type IsPhoneNumberBrand<T extends string> = {
  readonly [K in `IsPhoneNumber_${T}`]: symbol;
};

function isPhoneNumber(value: string, region?: CountryCode): boolean {
  try {
    const phoneNum = parsePhoneNumberFromString(value, region);
    const result = phoneNum?.isValid();
    return !!result;
  } catch (error) {
    return false;
  }
}

/**
 * Checks if the string is a valid phone number. To successfully validate any phone number the text must include
 * the intl. calling code, if the calling code wont be provided then the region must be set.
 */
export const IsPhoneNumber = <T extends CountryCode>(locale?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsPhoneNumberBrand<T>> =>
        isPhoneNumber(value, locale),
      ("IsPhoneNumber_" + locale) as `IsPhoneNumber_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a valid phone number`
  );
