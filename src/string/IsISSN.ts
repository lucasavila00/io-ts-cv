import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import type ValidatorJS from "validator";
import { nameFromCtx } from "../utils/ctx";
import isISSNValidator from "validator/lib/isISSN";

export interface IsISSNBrand {
  readonly IsISSN: unique symbol;
}
/**
 * Checks if the string is a ISSN.
 * @deprecated Not type safe, build your own brand with the configured validator to achieve type safety.
 */
export const IsISSN = (options?: ValidatorJS.IsISSNOptions) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsISSNBrand> =>
        isISSNValidator(value, options),
      "IsISSN"
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a ISSN`
  );
