import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

export interface IsEmptyBrand {
  readonly IsEmpty: unique symbol;
}

/**
 * Checks if given value is empty (=== '').
 */
export const IsEmpty = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsEmptyBrand> => value === "",
    "IsEmpty"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be empty`
);
