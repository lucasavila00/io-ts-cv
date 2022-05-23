import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isLocaleValidator from "validator/lib/isLocale";

export interface IsLocaleBrand {
  readonly IsLocale: unique symbol;
}

/**
 * Check if the string is a locale.
 */
export const IsLocale = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsLocaleBrand> =>
      isLocaleValidator(value),
    "IsLocale"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be locale`
);
