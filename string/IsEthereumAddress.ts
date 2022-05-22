import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isEthereumAddressValidator from "validator/lib/isEthereumAddress";

interface IsEthereumAddressBrand {
  readonly IsEthereumAddress: unique symbol;
}

/**
 * Check if the string is an Ethereum address using basic regex. Does not validate address checksums.
 */
export const IsEthereumAddress = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsEthereumAddressBrand> =>
      isEthereumAddressValidator(value),
    "IsEthereumAddress"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be an Ethereum address`
);
