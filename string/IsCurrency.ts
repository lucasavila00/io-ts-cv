import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isCurrencyValidator from "validator/lib/isCurrency";

interface IsCurrencyBrand {
  readonly IsCurrency: unique symbol;
}
/**
 * Checks if the string is a valid currency amount.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsCurrency = (options?: ValidatorJS.IsCurrencyOptions) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsCurrencyBrand> =>
        isCurrencyValidator(value, options),
      "IsCurrency"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a currency`
  );
