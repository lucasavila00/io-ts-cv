import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isHSLValidator from "validator/lib/isHSL";

interface IsHSLBrand {
  readonly IsHSL: unique symbol;
}

/**
 * Check if the string is an HSL (hue, saturation, lightness, optional alpha) color based on CSS Colors Level 4 specification.
 * Comma-separated format supported. Space-separated format supported with the exception of a few edge cases (ex: hsl(200grad+.1%62%/1)).
 */
export const IsHSL = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsHSLBrand> => isHSLValidator(value),
    "IsHSL"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a HSL color`
);
