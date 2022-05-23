import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isHexColorValidator from "validator/lib/isHexColor";
export interface IsHexColorBrand {
  readonly IsHexColor: unique symbol;
}

/**
 * Checks if the string is a hexadecimal color.
 */
export const IsHexColor = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsHexColorBrand> =>
      isHexColorValidator(value),
    "IsHexColor"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a hexadecimal color`
);
