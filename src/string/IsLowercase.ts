import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isLowercaseValidator from "validator/lib/isLowercase";

export interface IsLowercaseBrand {
  readonly IsLowercase: unique symbol;
}

/**
 * Checks if the string is lowercase.
 */
export const IsLowercase = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsLowercaseBrand> =>
      isLowercaseValidator(value),
    "IsLowercase"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a lowercase string`
);
