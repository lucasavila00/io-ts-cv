import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isUrlValidator from "validator/lib/isURL";

export interface IsUrlBrand {
  readonly IsUrl: unique symbol;
}
/**
 * Checks if the string is an url.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsUrl = (options?: ValidatorJS.IsURLOptions) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsUrlBrand> =>
        isUrlValidator(value, options),
      "IsUrl"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be an URL address`
  );
