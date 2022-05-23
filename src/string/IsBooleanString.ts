import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isBooleanValidator from "validator/lib/isBoolean";
import { nameFromCtx } from "../utils/ctx";

export interface IsBooleanStringBrand {
  readonly IsBooleanString: unique symbol;
}

/**
 * Checks if a string is a boolean.
 */
export const IsBooleanString = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsBooleanStringBrand> =>
      isBooleanValidator(value),
    "IsBooleanString"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a boolean string`
);
