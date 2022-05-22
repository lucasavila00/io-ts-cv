import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isLengthValidator from "validator/lib/isLength";
import { nameFromCtx } from "../utils/ctx";

type MaxLengthBrand<T extends number> = {
  readonly [K in `MaxLength_${T}`]: symbol;
};

/**
 * Checks if the string's length is not more than given number.
 */
export const MaxLength = <T extends number>(max: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, MaxLengthBrand<T>> =>
        isLengthValidator(value, { min: 0, max }),
      ("MaxLength_" + max) as `MaxLength_${T}`
    ),
    (_value, ctx) =>
      `${nameFromCtx(ctx)} must be shorter than or equal to ${max} characters`
  );
