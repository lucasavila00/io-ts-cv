import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isIdentityCardValidator from "validator/lib/isIdentityCard";

type IsIdentityCardBrand<T extends string> = {
  readonly [K in `IsIdentityCard_${T}`]: symbol;
};

/**
 * Check if the string is a valid identity card code.
 */
export const IsIdentityCard = <T extends ValidatorJS.IdentityCardLocale>(
  locale: T
) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsIdentityCardBrand<T>> =>
        isIdentityCardValidator(value, locale),
      ("IsIdentityCard_" + locale) as `IsIdentityCard_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a identity card number`
  );
