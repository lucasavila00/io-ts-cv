import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

type MaxBrand<T extends number> = {
  readonly [K in `Max_${T}`]: symbol;
};

/**
 * Checks if the first number is less than or equal to the second.
 */
export const Max = <T extends number>(max: T) =>
  withMessage(
    t.brand(
      t.number,
      (value): value is t.Branded<number, MaxBrand<T>> => value <= max,
      ("Max_" + max) as `Max_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must not be greater than ${max}`
  );
