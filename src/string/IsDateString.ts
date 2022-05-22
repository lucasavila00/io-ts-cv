import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isIso8601Validator from "validator/lib/isISO8601";

type IsDateStringBrand<T extends boolean> = {
  readonly [K in `IsDateString_${T}`]: symbol;
};
/**
 * Alias for IsISO8601 validator
 */
export const IsDateString = <T extends boolean>(strict?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsDateStringBrand<T>> =>
        isIso8601Validator(value, { strict }),
      `IsDateString_${strict}` as `IsDateString_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a valid ISO 8601 date string`
  );
