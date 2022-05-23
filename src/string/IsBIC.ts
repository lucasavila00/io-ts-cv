import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isBICValidator from "validator/lib/isBIC";
import { nameFromCtx } from "../utils/ctx";

export interface IsBICBrand {
  readonly IsBIC: unique symbol;
}

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 */
export const IsBIC = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsBICBrand> => isBICValidator(value),
    "IsBIC"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a BIC or SWIFT code`
);
