import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isBase64Validator from "validator/lib/isBase64";
import { nameFromCtx } from "../utils/ctx";

export interface IsBase64Brand {
  readonly IsBase64: unique symbol;
}

/**
 * Check if a string is base64 encoded.
 */
export const IsBase64 = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsBase64Brand> =>
      isBase64Validator(value),
    "IsBase64"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be base64 encoded`
);
