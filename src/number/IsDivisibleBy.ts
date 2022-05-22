import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isDivisibleByValidator from "validator/lib/isDivisibleBy";

type IsDivisibleByBrand<T extends number> = {
  readonly [K in `IsDivisibleBy_${T}`]: symbol;
};

/**
 * Checks if value is a number that's divisible by another.
 */
export const IsDivisibleBy = <T extends number>(num: T) =>
  withMessage(
    t.brand(
      t.number,
      (value): value is t.Branded<number, IsDivisibleByBrand<T>> =>
        isDivisibleByValidator(String(value), num),
      ("IsDivisibleBy_" + num) as `IsDivisibleBy_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be divisible by ${num}`
  );
