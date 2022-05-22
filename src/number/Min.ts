import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

type MinBrand<T extends number> = {
  readonly [K in `Min_${T}`]: symbol;
};

/**
 * Checks if the first number is less than or equal to the second.
 */
export const Min = <T extends number>(min: T) =>
  withMessage(
    t.brand(
      t.number,
      (value): value is t.Branded<number, MinBrand<T>> => value >= min,
      ("Min_" + min) as `Min_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must not be less than ${min}`
  );
