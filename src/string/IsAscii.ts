import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import isAsciiValidator from "validator/lib/isAscii";
import { nameFromCtx } from "../utils/ctx";

export interface IsAsciiBrand {
  readonly IsAscii: unique symbol;
}

/**
 * Checks if the string contains ASCII chars only.
 */
export const IsAscii = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsAsciiBrand> =>
      isAsciiValidator(value),
    "IsAscii"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must contain only ASCII characters`
);
