import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isNumericValidator from "validator/lib/isNumeric";

type IsNumberStringBrand<T extends boolean> = {
  readonly [K in `IsNumberString_${T}`]: symbol;
};

/**
 * Checks if the string is numeric.
 */
export const IsNumberString = <T extends boolean>(no_symbols?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsNumberStringBrand<T>> =>
        isNumericValidator(value, { no_symbols }),
      `IsNumberString_${no_symbols}` as `IsNumberString_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be a number string`
  );
