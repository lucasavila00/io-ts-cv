import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isFullWidthValidator from "validator/lib/isFullWidth";

export interface IsFullWidthBrand {
  readonly IsFullWidth: unique symbol;
}

/**
 * Checks if the string contains any full-width chars.
 */
export const IsFullWidth = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsFullWidthBrand> =>
      isFullWidthValidator(value),
    "IsFullWidth"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must contain any full-width characters`
);
