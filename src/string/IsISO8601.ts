import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isIso8601Validator from "validator/lib/isISO8601";

type IsISO8601Brand<T extends boolean> = {
  readonly [K in `IsISO8601_${T}`]: symbol;
};
/**
 * Checks if the string is a valid ISO 8601 date.
 * Use the option strict = true for additional checks for a valid date, e.g. invalidates dates like 2019-02-29.
 */
export const IsISO8601 = <T extends boolean>(strict?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsISO8601Brand<T>> =>
        isIso8601Validator(value, { strict }),
      `IsISO8601_${strict}` as `IsISO8601_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a valid ISO 8601 date string`
  );
