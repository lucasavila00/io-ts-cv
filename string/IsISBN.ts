import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isIsbnValidator from "validator/lib/isISBN";
type IsISBNVersion = "10" | "13" | 10 | 13;

type IsISBNBrand<T extends string | number> = {
  readonly [K in `IsISBN_${T}`]: symbol;
};

/**
 * Checks if the string is an ISBN (version 10 or 13).
 */
export const IsISBN = <T extends IsISBNVersion>(version?: T) =>
  withMessage(
    t.brand(
      t.string,
      (value): value is t.Branded<string, IsISBNBrand<T>> =>
        isIsbnValidator(value, version),
      ("IsISBN_" + version) as `IsISBN_${T}`
    ),
    (_value, ctx) => `${nameFromCtx(ctx)} must be an ISBN`
  );
