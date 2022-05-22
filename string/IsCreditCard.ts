import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isCreditCardValidator from "validator/lib/isCreditCard";

interface IsCreditCardBrand {
  readonly IsCreditCard: unique symbol;
}

/**
 * Checks if the string is a credit card.
 */
export const IsCreditCard = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsCreditCardBrand> =>
      isCreditCardValidator(value),
    "IsCreditCard"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a credit card`
);
