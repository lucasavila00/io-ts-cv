import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isBase32Validator from "validator/lib/isBase32";
import { nameFromCtx } from "../utils/ctx";

export interface IsBase32Brand {
  readonly IsBase32: unique symbol;
}

/**
 * Check if a string is base32 encoded.
 */
export const IsBase32 = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsBase32Brand> =>
      isBase32Validator(value),
    "IsBase32"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be base32 encoded`
);
