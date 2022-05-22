import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isIPValidator from "validator/lib/isIP";
import { nameFromCtx } from "../utils/ctx";

type IsIpVersion = "4" | "6" | 4 | 6;

type IsIPBrand<T extends string | number> = {
  readonly [K in `IsIP_${T}`]: symbol;
};

/**
 * Checks if the string is an IP (version 4 or 6).
 */
export const IsIP = <T extends IsIpVersion>(version?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsIPBrand<T>> =>
        isIPValidator(value, version),
      ("IsIP_" + version) as `IsIP_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be an ip address`
  );
