import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isHalfWidthValidator from "validator/lib/isHalfWidth";

export interface IsHalfWidthBrand {
  readonly IsHalfWidth: unique symbol;
}

/**
 * Checks if the string contains any half-width chars.
 */
export const IsHalfWidth = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsHalfWidthBrand> =>
      isHalfWidthValidator(value),
    "IsHalfWidth"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must contain any half-width characters`
);
