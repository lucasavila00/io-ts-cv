import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isUppercaseValidator from "validator/lib/isUppercase";

interface IsUppercaseBrand {
  readonly IsUppercase: unique symbol;
}

/**
 * Checks if the string is uppercase.
 */
export const IsUppercase = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsUppercaseBrand> =>
      isUppercaseValidator(value),
    "IsUppercase"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be uppercase`
);
