import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isDataURIValidator from "validator/lib/isDataURI";

interface IsDataURIBrand {
  readonly IsDataURI: unique symbol;
}

/**
 * Check if the string is a data uri format.
 */
export const IsDataURI = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsDataURIBrand> =>
      isDataURIValidator(value),
    "IsDataURI"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a data uri format`
);
