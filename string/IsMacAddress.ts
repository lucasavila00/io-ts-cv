import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isMacAddressValidator from "validator/lib/isMACAddress";

type IsMacAddressBrand<T extends boolean> = {
  readonly [K in `IsMacAddress_${T}`]: symbol;
};

/**
 * Check if the string is a MAC address.
 */
export const IsMacAddress = <T extends boolean>(no_colons?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsMacAddressBrand<T>> =>
        isMacAddressValidator(value, { no_colons }),
      `IsMacAddress_${no_colons}` as `IsMacAddress_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a MAC Address`
  );
