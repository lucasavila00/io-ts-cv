import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

type NotEqualsBrand<T extends string | number | boolean> = {
  readonly [K in `NotEquals_${T}`]: symbol;
};

/**
 * Checks if value does not match ("!==") the comparison.
 */
export const NotEquals = <
  CODEC extends t.NumberType | t.StringType | t.BooleanType,
  T extends string | number | boolean
>(
  codec: CODEC,
  it: T
) =>
  withMessage(
    t.brand(
      codec,
      (value): value is t.Branded<t.TypeOf<CODEC>, NotEqualsBrand<T>> =>
        value !== it,
      ("NotEquals_" + it) as `NotEquals_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} should not be equal to ${it}`
  );
