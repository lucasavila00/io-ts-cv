import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isSurrogatePairValidator from "validator/lib/isSurrogatePair";

export interface IsSurrogatePairBrand {
  readonly IsSurrogatePair: unique symbol;
}

/**
 * Checks if the string contains any surrogate pairs chars.
 */
export const IsSurrogatePair = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsSurrogatePairBrand> =>
      isSurrogatePairValidator(value),
    "IsSurrogatePair"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must contain any surrogate pairs chars`
);
