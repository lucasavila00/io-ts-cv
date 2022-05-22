import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isLengthValidator from "validator/lib/isLength";
import { nameFromCtx } from "../utils/ctx";

type MinLengthBrand<T extends number> = {
  readonly [K in `MinLength_${T}`]: symbol;
};

/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 */
export const MinLength = <T extends number>(min: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, MinLengthBrand<T>> =>
        isLengthValidator(value, { min }),
      ("MinLength_" + min) as `MinLength_${T}`
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)} must be longer than or equal to ${min} characters`
  );
