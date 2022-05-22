import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isISO31661Alpha3Validator from "validator/lib/isISO31661Alpha3";

interface IsISO31661Alpha3Brand {
  readonly IsISO31661Alpha3: unique symbol;
}

/**
 * Check if the string is a valid [ISO 3166-1 alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned country code.
 */
export const IsISO31661Alpha3 = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsISO31661Alpha3Brand> =>
      isISO31661Alpha3Validator(value),
    "IsISO31661Alpha3"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a valid ISO31661 Alpha3 code`
);
