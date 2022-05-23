import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isEmailValidator from "validator/lib/isEmail";

export interface IsEmailBrand {
  readonly IsEmail: unique symbol;
}

/**
 * Checks if the string is an email.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsEmail = (options?: ValidatorJS.IsEmailOptions) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsEmailBrand> =>
        isEmailValidator(value, options),
      "IsEmail"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be an email`
  );
