import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isMultibyteValidator from "validator/lib/isMultibyte";

interface IsMultibyteBrand {
  readonly IsMultibyte: unique symbol;
}

/**
 * Checks if the string contains one or more multibyte chars.
 */
export const IsMultibyte = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsMultibyteBrand> =>
      isMultibyteValidator(value),
    "IsMultibyte"
  ),
  (_value, ctx) =>
    `${nameFromCtx(ctx)} must contain one or more multibyte chars`
);
