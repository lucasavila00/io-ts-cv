import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isRFC3339Validator from "validator/lib/isRFC3339";

export interface IsRFC3339Brand {
  readonly IsRFC3339: unique symbol;
}

/**
 * Check if the string is a valid RFC 3339 date.
 */
export const IsRFC3339 = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsRFC3339Brand> =>
      isRFC3339Validator(value),
    "IsRFC3339"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be RFC 3339 date`
);
