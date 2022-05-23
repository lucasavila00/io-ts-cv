import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isBtcAddressValidator from "validator/lib/isBtcAddress";

export interface IsBtcAddressBrand {
  readonly IsBtcAddress: unique symbol;
}

/**
 * Check if the string is a valid BTC address.
 */
export const IsBtcAddress = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsBtcAddressBrand> =>
      isBtcAddressValidator(value),
    "IsBtcAddress"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a BTC address`
);
