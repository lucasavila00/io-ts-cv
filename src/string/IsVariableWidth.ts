import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isVariableWidthValidator from "validator/lib/isVariableWidth";

export interface IsVariableWidthBrand {
  readonly IsVariableWidth: unique symbol;
}

/**
 * Checks if the string contains variable-width chars.
 */
export const IsVariableWidth = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsVariableWidthBrand> =>
      isVariableWidthValidator(value),
    "IsVariableWidth"
  ),
  (_value, ctx) =>
    `${nameFromCtx(ctx)} must contain a full-width and half-width characters`
);
