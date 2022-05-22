import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isFqdnValidator from "validator/lib/isFQDN";

interface IsFQDNBrand {
  readonly IsFQDN: unique symbol;
}

/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsFQDN = (options?: ValidatorJS.IsFQDNOptions) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsFQDNBrand> =>
        isFqdnValidator(value, options),
      "IsFQDN"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a valid domain name`
  );
