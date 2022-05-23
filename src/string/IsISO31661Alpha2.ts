import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isISO31661Alpha2Validator from "validator/lib/isISO31661Alpha2";

export interface IsISO31661Alpha2Brand {
  readonly IsISO31661Alpha2: unique symbol;
}

/**
 * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
 */
export const IsISO31661Alpha2 = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsISO31661Alpha2Brand> =>
      isISO31661Alpha2Validator(value),
    "IsISO31661Alpha2"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a valid ISO31661 Alpha2 code`
);
