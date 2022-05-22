import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isPostalCodeValidator from "validator/lib/isPostalCode";
import type ValidatorJS from "validator";

type IsPostalCodeBrand<T extends string> = {
  readonly [K in `IsPostalCode_${T}`]: symbol;
};

/**
 * Check if the string is a postal code,
 */
export const IsPostalCode = <T extends ValidatorJS.PostalCodeLocale>(
  locale: T
) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsPostalCodeBrand<T>> =>
        isPostalCodeValidator(value, locale),
      ("IsPostalCode_" + locale) as `IsPostalCode_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a postal code`
  );
