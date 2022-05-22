import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isHexadecimalValidator from "validator/lib/isHexadecimal";

interface IsHexadecimalBrand {
  readonly IsHexadecimal: unique symbol;
}

/**
 * Checks if the string is a hexadecimal number.
 */
export const IsHexadecimal = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsHexadecimalBrand> =>
      isHexadecimalValidator(value),
    "IsHexadecimal"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a hexadecimal number`
);
