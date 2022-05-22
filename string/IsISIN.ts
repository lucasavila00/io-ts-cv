import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isIsinValidator from "validator/lib/isISIN";

interface IsISINBrand {
  readonly IsISIN: unique symbol;
}

/**
 * Checks if the string is an ISIN (stock/security identifier).
 */
export const IsISIN = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsISINBrand> => isIsinValidator(value),
    "IsISIN"
  ),
  (_value, ctx) =>
    `${nameFromCtx(ctx)} must be an ISIN (stock/security identifier)`
);
