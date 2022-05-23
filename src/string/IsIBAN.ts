import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isIBANValidator from "validator/lib/isIBAN";

export interface IsIBANBrand {
  readonly IsIBAN: unique symbol;
}

/**
 * Check if a string is a IBAN (International Bank Account Number).
 */
export const IsIBAN = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsIBANBrand> => isIBANValidator(value),
    "IsIBAN"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be an IBAN`
);
