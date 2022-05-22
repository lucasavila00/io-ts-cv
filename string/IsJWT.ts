import * as t from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { nameFromCtx } from "../utils/ctx";
import isJwtValidator from "validator/lib/isJWT";

interface IsJWTBrand {
  readonly IsJWT: unique symbol;
}

/**
 * Checks if the string is valid JWT token.
 */
export const IsJWT = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IsJWTBrand> => isJwtValidator(value),
    "IsJWT"
  ),
  (_value, ctx) => `${nameFromCtx(ctx)} must be a jwt string`
);
