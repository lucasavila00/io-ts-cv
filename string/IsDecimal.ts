import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isDecimalValidator from "validator/lib/isDecimal";

interface IsDecimalBrand {
  readonly IsDecimal: unique symbol;
}
/**
 * Checks if the string is a valid decimal number.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsDecimal = (options?: ValidatorJS.IsDecimalOptions) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsDecimalBrand> =>
        isDecimalValidator(value, options),
      "IsDecimal"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} is not a valid decimal number.`
  );
