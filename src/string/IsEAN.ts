import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isEANValidator from "validator/lib/isEAN";

export interface IsEANBrand {
  readonly IsEAN: unique symbol;
}

/**
 * Check if the string is an EAN (European Article Number).
 */
export const IsEAN = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsEANBrand> => isEANValidator(value),
    "IsEAN"
  ),
  (_value, ctx) =>
    `${nameFromCtx(ctx)} must be an EAN (European Article Number)`
);
