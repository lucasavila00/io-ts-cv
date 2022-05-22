import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isAlphaValidator from "validator/lib/isAlpha";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";

type IsAlphaBrand<T extends string> = {
  readonly [K in `IsAlpha_${T}`]: symbol;
};

/**
 * Checks if the string contains only letters (a-zA-Z).
 */
export const IsAlpha = <T extends ValidatorJS.AlphaLocale>(locale?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsAlphaBrand<T>> =>
        isAlphaValidator(value, locale),
      ("IsAlpha_" + locale) as `IsAlpha_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must contain only letters (a-zA-Z)`
  );
