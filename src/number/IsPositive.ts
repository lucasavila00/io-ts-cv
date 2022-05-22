import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

interface IsPositiveBrand {
  readonly IsPositive: unique symbol;
}

/**
 * Checks if the value is a positive number greater than zero.
 */
export const IsPositive = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, IsPositiveBrand> => value > 0,
    "IsPositive"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a positive number`
);
