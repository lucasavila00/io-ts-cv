import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface IsNegativeBrand {
  readonly IsNegative: unique symbol;
}

/**
 * Checks if the value is a negative number smaller than zero.
 */
export const IsNegative = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, IsNegativeBrand> => value < 0,
    "IsNegative"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a negative number`
);
