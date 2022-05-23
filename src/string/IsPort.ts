import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isPortValidator from "validator/lib/isPort";

export interface IsPortBrand {
  readonly IsPort: unique symbol;
}

/**
 * Check if the string is a valid port number.
 */
export const IsPort = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsPortBrand> => isPortValidator(value),
    "IsPort"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a port`
);
