import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isMagnetURIValidator from "validator/lib/isMagnetURI";

interface IsMagnetURIBrand {
  readonly IsMagnetURI: unique symbol;
}

/**
 * Check if the string is a magnet uri format.
 */
export const IsMagnetURI = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsMagnetURIBrand> =>
      isMagnetURIValidator(value),
    "IsMagnetURI"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be magnet uri format`
);
