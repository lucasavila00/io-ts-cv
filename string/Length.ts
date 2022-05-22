import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isLengthValidator from "validator/lib/isLength";

type LengthBrand<T extends number, U extends number> = {
  readonly [K in `Length_${T}_${U}`]: symbol;
};

/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 */
export const Length = <T extends number, U extends number>(min: T, max?: U) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, LengthBrand<T, U>> =>
        isLengthValidator(value, { min, max }),
      `Length_${min}_${max}` as `Length_${T}_${U}`
    ),
    (_value, ctx) =>
      `${nameFromCtx(
        ctx
      )} must be longer than or equal to ${min} and shorter than or equal to ${max} characters`
  );
