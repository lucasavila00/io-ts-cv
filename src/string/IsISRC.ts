import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isISRCValidator from "validator/lib/isISRC";

export interface IsISRCBrand {
  readonly IsISRC: unique symbol;
}

/**
 * Check if the string is a ISRC.
 */
export const IsISRC = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsISRCBrand> => isISRCValidator(value),
    "IsISRC"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be an ISRC`
);
