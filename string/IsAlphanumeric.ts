import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import ValidatorJS from "validator";
import isAlphanumericValidator from "validator/lib/isAlphanumeric";
import { nameFromCtx } from "../utils/ctx";

type IsAlphanumericBrand<T extends string> = {
  readonly [K in `IsAlphanumeric_${T}`]: symbol;
};

/**
 * Checks if the string contains only letters and numbers.
 */
export const IsAlphanumeric = <T extends ValidatorJS.AlphanumericLocale>(
  locale?: T
) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsAlphanumericBrand<T>> =>
        isAlphanumericValidator(value, locale),
      ("IsAlphanumeric_" + locale) as `IsAlphanumeric_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must contain only letters and numbers`
  );
