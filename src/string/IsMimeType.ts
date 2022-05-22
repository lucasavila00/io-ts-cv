import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isMimeTypeValidator from "validator/lib/isMimeType";

interface IsMimeTypeBrand {
  readonly IsMimeType: unique symbol;
}

/**
 * Check if the string matches to a valid MIME type format
 */
export const IsMimeType = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsMimeTypeBrand> =>
      isMimeTypeValidator(value),
    "IsMimeType"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be MIME type format`
);
