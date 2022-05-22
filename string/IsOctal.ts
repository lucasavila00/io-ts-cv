import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isOctalValidator from "validator/lib/isOctal";

interface IsOctalBrand {
  readonly IsOctal: unique symbol;
}

/**
 * Check if the string is a valid octal number.
 */
export const IsOctal = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsOctalBrand> =>
      isOctalValidator(value),
    "IsOctal"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be valid octal number`
);
