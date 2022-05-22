import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";

interface IsNotEmptyBrand {
  readonly IsNotEmpty: unique symbol;
}

/**
 * Checks if given value is not empty (!== '').
 */
export const IsNotEmpty = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsNotEmptyBrand> => value !== "",
    "IsNotEmpty"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} should not be empty`
);
